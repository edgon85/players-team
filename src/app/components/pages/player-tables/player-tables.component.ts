import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../../../interfaces/players';
import { PlayerService } from '../../../services/player.service';

@Component({
  selector: 'app-player-tables',
  templateUrl: './player-tables.component.html',
  styles: []
})
export class PlayerTablesComponent implements OnInit {
  public players$: Observable<Player[]>;
  public selectdPlayer: Player;

  showModal = false;

  // tslint:disable-next-line: variable-name
  constructor(private _playerService: PlayerService) {}

  ngOnInit() {}

  obtenerPlayers() {
    this.players$ = this._playerService.getPlayers();
  }

  newPlayer() {
    this.showModal = true;
    this.selectdPlayer = null;
    setTimeout(() => {
      window.location.replace('#open');
    }, 0);
  }
}
