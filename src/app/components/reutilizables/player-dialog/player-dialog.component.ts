import { Component, OnInit } from '@angular/core';
import { Team } from '../../../interfaces/team';
import { Countries } from 'src/app/interfaces/players';
import { SquadNumber, Player } from '../../../interfaces/players';
import { PlayerService } from '../../../services/player.service';
import { TeamService } from '../../../services/team.service';
import { take } from 'rxjs/operators';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-player-dialog',
  templateUrl: './player-dialog.component.html',
  styleUrls: ['./player-dialog.component.scss']
})
export class PlayerDialogComponent implements OnInit {
  private team: Team;
  public player: Player;

  public countries = Object.keys(Countries).map(key => ({
    label: key,
    key: Countries[key]
  }));

  public squadNumber = Object.keys(SquadNumber)
    .slice(Object.keys(SquadNumber).length / 2)
    .map(key => ({ label: key, key: SquadNumber[key] }));

  constructor(
    private playerService: PlayerService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.obtenerTeam();
  }

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

  nuevoJugador(playerFormValue: any) {
    const key = this.playerService.addPlayer(playerFormValue).key;
    const playerFormValueKey = { ...playerFormValue, key };

    const formattedTeam = {
      ...this.team,
      players: [
        ...(this.team.players ? this.team.players : []),
        playerFormValueKey
      ]
    };
    this.teamService.editTeam(formattedTeam);
  }

  guardarJugador(playerForm: NgForm) {
    const playerFormValue = { ...playerForm.value };

    if (playerForm.valid) {
      playerFormValue.leftFooted =
        playerFormValue.leftFooted === '' ? false : playerFormValue.leftFooted;
    }
    this.nuevoJugador(playerFormValue);
    window.location.replace('#');
  }

  cerrarModal() {}
}
