import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActividadtipoService } from 'src/app/services/actividadtipo.service';
import { ActividadService } from 'src/app/services/actividad.service';
import Actividad from '../../models/actividad';
import { FormControl, Validators } from '@angular/forms';
import { ConstService } from 'src/app/services/const.service';
import { GenericList } from 'src/app/models/list-item.model';

@Component({
  selector: 'app-actividad-edit',
  templateUrl: './edit.actividad.component.html',
  styleUrls: ['./edit.actividad.component.scss']
})
export class EditActividadComponent implements OnInit {
  actividad: Actividad;
  subscriptions = [];
  tipos: any [];
  usuariesEnumn : GenericList;
  descripcionControl : FormControl;
  constructor(public dialogRef: MatDialogRef<EditActividadComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,
  private actividadTipoService: ActividadtipoService, private actividadService: ActividadService, private constService: ConstService) { }
  descripcion = new FormControl('', [
    Validators.maxLength(5000)  
  ]); 

  fecha = new Date();

  ngOnInit(){
    this.usuariesEnumn = this.constService.getUsuarias();
    
    this.subscriptions.push(this.actividadTipoService.getAll().subscribe(data => this.tipos = data));
        if(this.data !== null){
          this.actividad = this.data;
          this.fecha = new Date(this.actividad.fecha);
          this.descripcionControl = new FormControl(this.actividad.descripcion);      
        }else {
          this.actividad = {key: '', titulo: '', descripcion: '', ubicacion: '', fecha: new Date().getTime(), actividadTipoKey:'', actividadTipo:'', participantes :'', quienRegistraKey : [], activo: true};
          this.descripcionControl = new FormControl();      
        }
  }
 

  guardar() {
    this.actividad.fecha = this.fecha.getTime();
    this.actividad.descripcion = this.descripcionControl.value;
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
    let index = this.tipos.findIndex(t => t.key === tipo.value);
    if(index > -1){
      this.actividad.actividadTipo = this.tipos[index];
    }
  }

  cerrarDialog() {
    this.dialogRef.close({ action: 'cancel', status:true });
  }

 
}
