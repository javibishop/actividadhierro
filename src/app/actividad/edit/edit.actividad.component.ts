import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import ActividadTipo from 'src/app/models/actividadtipo';
import { ActividadtipoService } from 'src/app/services/actividadtipo.service';
import { ActividadService } from 'src/app/services/actividad.service';
import Actividad from '../../models/actividad'
import { take } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-actividad-edit',
  templateUrl: './edit.actividad.component.html',
  styleUrls: ['./edit.actividad.component.scss']
})
export class EditActividadComponent implements OnInit {
  actividad: Actividad;
  tipos: ActividadTipo [];
  participantes: [];
  constructor(public dialogRef: MatDialogRef<EditActividadComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,
  private actividadTipoService: ActividadtipoService, private actividadService: ActividadService) { }
  descripcion = new FormControl('', [
    Validators.maxLength(5000)
  ]); 

  ngOnInit(){
    this.actividadTipoService
				.getAll()
				.valueChanges()
				.pipe(take(1))
        .subscribe(p => this.tipos = p);
        
        if(this.data !== null){
          this.actividad = this.data;
        }else {
          this.actividad = {key: '', titulo: '', descripcion: '', ubicacion: '', fecha: new Date().getTime(), actividadKey:'', participantesKey:[''], activo: true};
        }
  }


  guardar() {
    if (this.actividad.key !== '') {
			this.actividadService.update(this.actividad.key, this.actividad);
		} else {
			this.actividad.activo = true;
			this.actividadService.create(this.actividad);
		}
  }

 
}
