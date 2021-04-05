import { ListItem } from './models/list-item.model';
import { getDescriptions } from './pipes/getDescriptions';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AdminActiviadTipoComponent } from './actividadtipo/admin/admin.actividadtipo.component';
import { EditActividadTipoComponent } from './actividadtipo/edit/edit.actividadtipo.component';
import { AdminActiviadComponent } from './actividad/admin/admin.actividad.component';
import { EditActividadComponent } from './actividad/edit/edit.actividad.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CalendarioComponent } from './calendario/calendario.component';
import {QuillModule} from 'ngx-quill';
import { FullCalendarModule } from '@fullcalendar/angular';

@NgModule({
  declarations: [
    AppComponent,
    AdminActiviadTipoComponent,
    EditActividadTipoComponent,
    AdminActiviadComponent,
    EditActividadComponent,
    LoginComponent,
    RegisterComponent,
    getDescriptions,
    CalendarioComponent
  ],
  entryComponents: [EditActividadTipoComponent, EditActividadComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NoopAnimationsModule, 
    MatFormFieldModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FullCalendarModule,
    RouterModule.forRoot([
      { path: 'tipoActividad', component: AdminActiviadTipoComponent, canActivate: [AuthGuardService] },
      { path: 'actividad', component: AdminActiviadComponent, canActivate: [AuthGuardService] },
      { path: 'login', component: LoginComponent },
      { path: 'registrar', component: RegisterComponent },
      { path: 'calendario', component: CalendarioComponent, canActivate: [AuthGuardService] },
    ]),
    QuillModule.forRoot({
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote', 'code-block'],

          [{header: 1}, {header: 2}], // custom button values
          [{list: 'ordered'}, {list: 'bullet'}],
          [{script: 'sub'}, {script: 'super'}], // superscript/subscript
          [{indent: '-1'}, {indent: '+1'}], // outdent/indent
          [{direction: 'rtl'}], // text direction

          [{size: ['small', false, 'large', 'huge']}], // custom dropdown
          [{header: [1, 2, 3, 4, 5, 6, false]}],

          [
            {color: []},
            {background: []}
          ], // dropdown with defaults from theme
          [{font: []}],
          [{align: []}],
          ['clean'], // remove formatting button
        ]
      }
    })
  ],
  providers: [AuthService, AuthGuardService, AngularFireAuth, AngularFireDatabase,
    { provide: MAT_DATE_LOCALE, useValue: 'es-AR'}],
  bootstrap: [AppComponent]
})
export class AppModule { }


