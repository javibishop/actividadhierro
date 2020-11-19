import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import ActividadTipo from 'src/app/models/actividadtipo';
import { ActividadtipoService } from 'src/app/services/actividadtipo.service';
import { ActividadService } from 'src/app/services/actividad.service';
import Actividad from '../../models/actividad'
import { take } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { getLocaleDateTimeFormat } from '@angular/common';

@Component({
  selector: 'app-actividad-edit',
  templateUrl: './edit.actividad.component.html',
  styleUrls: ['./edit.actividad.component.scss']
})
export class EditActividadComponent implements OnInit {
  actividad: Actividad;
  subscriptions = [];
  tipos: any [];
  participantes: any [];
  constructor(public dialogRef: MatDialogRef<EditActividadComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,
  private actividadTipoService: ActividadtipoService, private actividadService: ActividadService, private userService: UserService) { }
  descripcion = new FormControl('', [
    Validators.maxLength(5000)
  ]); 

  fecha = new Date();

  ngOnInit(){
    this.subscriptions.push(this.actividadTipoService.getAll().subscribe(data => this.tipos = data));
    this.subscriptions.push(this.userService.getUsers().subscribe(usuaries => this.participantes = usuaries));
        
        if(this.data !== null){
          this.actividad = this.data;
          this.fecha = new Date(this.actividad.fecha);
        }else {
          this.actividad = {key: '', titulo: '', descripcion: '', ubicacion: '', fecha: new Date().getTime(), actividadTipoKey:'', actividadTipo:'', participantesKey:[''], activo: true};
        }
  }
 

  guardar(f) {
    this.actividad.fecha = this.fecha.getTime();
    if (this.actividad.key !== '') {
      this.actividadService.update(this.actividad.key, this.actividad);
      this.dialogRef.close({ action: 'create', status:true });
		} else {
			this.actividad.activo = true;
      this.actividadService.create(this.actividad);
      
      this.dialogRef.close({ action: 'update', status:true });
		}
  }

  tipoChange(tipo){
    let index = this.tipos.findIndex(t => t.key === tipo.target.value);
    if(index > -1){
      this.actividad.actividadTipo = this.tipos[index];
    }
  }

  cerrarDialog() {
    this.dialogRef.close({ action: 'cancel', status:true });
  }

 
}
