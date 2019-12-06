import { Component, OnInit } from '@angular/core';
import { Team } from '../../../interfaces/team';
import { Observable } from 'rxjs';
import { TeamService } from '../../../services/team.service';
import { take } from 'rxjs/operators';
import { Countries } from 'src/app/interfaces/players';
import { TEAM_TABLE_HEADERS } from '../../../utils/constantes';

@Component({
  selector: 'app-table-team',
  templateUrl: './table-team.component.html',
  styleUrls: ['./table-team.component.scss']
})
export class TableTeamComponent implements OnInit {
  public tableHeaders = TEAM_TABLE_HEADERS;
  public teams$: Observable<Team[]>;

  // tslint:disable-next-line: variable-name
  constructor(private _teamService: TeamService) {}

  ngOnInit() {
    this.obtenerEquipos();
  }

  obtenerEquipos() {
    this.teams$ = this._teamService.getTeams();

    this.teams$.pipe(take(1)).subscribe(teams => {
      if (teams.length === 0) {
        const team: Team = {
          name: 'My amazing team',
          country: Countries.Guatemala,
          players: null
        };
        this._teamService.addTeam(team);
      }
    });
  }
}
