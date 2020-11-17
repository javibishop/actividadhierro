import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ActividadtipoService } from 'src/app/services/actividadtipo.service';
import ActividadTipo from '../../models/actividadtipo'

@Component({
  selector: 'app-actividadtipo-edit',
  templateUrl: './edit.actividadtipo.component.html',
  styleUrls: ['./edit.actividadtipo.component.scss']
})
export class EditActividadTipoComponent implements OnInit {
  actividadTipo = {} as ActividadTipo;

  constructor(public dialogRef: MatDialogRef<EditActividadTipoComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,
  private actividadtipoService: ActividadtipoService) { }

  ngOnInit(){
    if(this.data !== null){
      this.actividadTipo = this.data;
    }else {
      this.actividadTipo = {key: '', nombre: '', descripcion: '', activo: true};
    }
  }


  guardar(f) {
    if (this.actividadTipo.key !== '') {
			this.actividadtipoService.update(this.actividadTipo.key, this.actividadTipo);
		} else {
			this.actividadTipo.activo = true;
			this.actividadtipoService.create(this.actividadTipo);
		}
  }

  cancelarEdicion() {
    this.dialogRef.close({ update: false });
  }
  delete() {

  }
}
