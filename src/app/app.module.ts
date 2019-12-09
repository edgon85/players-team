import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { HomeComponent } from './components/pages/home/home.component';
import { TableTeamComponent } from './components/pages/table-team/table-team.component';
import { PlayerTablesComponent } from './components/pages/player-tables/player-tables.component';
import { PlayerDialogComponent } from './components/reutilizables/player-dialog/player-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableTeamComponent,
    PlayerTablesComponent,
    PlayerDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
