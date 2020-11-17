import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import ActividadTipo from 'src/app/models/actividadtipo';
import { ActividadtipoService } from 'src/app/services/actividadtipo.service';
import { ActividadService } from 'src/app/services/actividad.service';
import Actividad from '../../models/actividad'
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-actividad-edit',
  templateUrl: './edit.actividad.component.html',
  styleUrls: ['./edit.actividad.component.scss']
})
export class EditActividadComponent implements OnInit {
  actividad: Actividad;
  tipos: ActividadTipo [];
  constructor(public dialogRef: MatDialogRef<EditActividadComponent>,  @Inject(MAT_DIALOG_DATA) public data: any,
  private actividadTipoService: ActividadtipoService, private actividadService: ActividadService) { }

  ngOnInit(){
    this.actividadTipoService
				.getAll()
				.valueChanges()
				.pipe(take(1))
				.subscribe(p => this.tipos = p);
  }


  guardar() {
    // if (this.order.key !== undefined && this.order.key !== '') {
    //   this.orderService.update(this.order.key, this.order).then(result => {
    //     this.dialogRef.close({result:true, data: this.order, update: true});
    //   }).catch(result =>{
    //     console.log('error al cambiar estado');
    //   });
    // }
  }
}
