import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import ActividadTipo from '../../models/actividadtipo'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.actividadtipo.component.html',
  styleUrls: ['./edit.actividadtipo.component.scss']
})
export class EditActividadTipoComponent implements OnInit {
  actividadTipo: ActividadTipo;
  constructor(public dialogRef: MatDialogRef<EditActividadTipoComponent>,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(){
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
