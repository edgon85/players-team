import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Player } from '../interfaces/players';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private playersDb: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playersDb = this.db.list('/players', ref => ref.orderByChild('name'));
  }

  // ========================================================================= //
  // Obtener todos los juagdores
  // ========================================================================= //
  getPlayers(): Observable<Player[]> {
    return this.playersDb.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
      })
    );
  }
  // ========================================================================= //

  // ========================================================================= //
  // Agregar jugador
  // ========================================================================= //
  addPlayer(player: Player) {
    return this.playersDb.push(player);
  }
  // ========================================================================= //

  // ========================================================================= //
  // Editar jugador
  // ========================================================================= //
  editPlayer(newPlayerData: Player) {
    const $key = newPlayerData.$key;
    delete newPlayerData.$key;

    return this.db.list('/players').update($key, newPlayerData);
  }
  // ========================================================================= //

  // ========================================================================= //
  // Eliminar jugador
  // ========================================================================= //
  deletePlayer(id: string) {
    return this.db.list('/players').remove(id);
  }
  // ========================================================================= //
}
