import { Component, OnInit } from '@angular/core';
import { Team } from '../../../interfaces/team';
import { Countries } from 'src/app/interfaces/players';
import { SquadNumber } from '../../../interfaces/players';
import { PlayerService } from '../../../services/player.service';
import { TeamService } from '../../../services/team.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss']
})
export class PlayerDialogComponent implements OnInit {
  private team: Team;

  public countries = Object.keys(Countries).map(key => ({
    label: key,
    key: Countries
  }));

  public squadNumber = Object.keys(SquadNumber).slice(
    Object.keys(SquadNumber).length / 2
  );

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit() {}

  obtenerTeam() {
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(resp => {
        if (resp.length > 0) {
          this.team = resp[0];
        }
      });
  }

  nuevoJugador(playerFormValue) {
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueKey = { ...playerFormValue, key };
    const formatedTeam = {
      ...this.team,
      players: [
        ...(this.team.players ? this.team.players : []),
        playerFormValueKey
      ]
    };

    this.teamService.editTeam(formatedTeam);
  }
}
