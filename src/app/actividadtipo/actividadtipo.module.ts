import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { AdminActiviadTipoComponent } from './admin/admin.actividadtipo.component';
import { EditActividadTipoComponent } from './edit/edit.actividadtipo.component';
import { AdminAuthGuardService } from "../services/admin-auth-guard.service"; 
import { AuthGuardService } from "../services/auth-guard.service";
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes2: Routes = [
{
    path: 'actividatipo',
    component: AdminActiviadTipoComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService] 
},
{
    path: 'actividatipo/:id',
    component: EditActividadTipoComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService] 
}];

@NgModule({
    imports: [
      //NgbModule,
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      RouterModule.forChild(routes2),
      MatPaginatorModule,
      MatTableModule,
      MatIconModule,
      MatPaginatorModule,
      MatFormFieldModule,
      MatDividerModule
    ],
    declarations: [
        AdminActiviadTipoComponent, 
        EditActividadTipoComponent
    ]
})
export class ActividadTipoModule {
}