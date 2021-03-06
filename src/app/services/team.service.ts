import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Team } from '../interfaces/team';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private teamsDb: AngularFireList<Team>;

  constructor(private db: AngularFireDatabase) {
    this.teamsDb = this.db.list('/teams', ref => ref.orderByChild('name'));
  }

  // ========================================================================= //
  // Obtener todos los Equipos
  // ========================================================================= //
  getTeams(): Observable<Team[]> {
    return this.teamsDb.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
      })
    );
  }
  // ========================================================================= //

  // ========================================================================= //
  // Agregar equipo
  // ========================================================================= //
  addTeam(player: Team) {
    return this.teamsDb.push(player);
  }
  // ========================================================================= //

  // ========================================================================= //
  // Editar Equipo
  // ========================================================================= //
  editTeam(newTeamData: Team) {
    const $key = newTeamData.$key;
    delete newTeamData.$key;

    return this.db.list('/teams').update($key, newTeamData);
  }
  // ========================================================================= //

  // ========================================================================= //
  // Eliminar jugador
  // ========================================================================= //
  deleteTeam(id: string) {
    return this.db.list('/teams').remove(id);
  }
  // ========================================================================= //
}
