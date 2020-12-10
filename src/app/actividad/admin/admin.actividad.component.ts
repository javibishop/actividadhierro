
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { ActividadService } from 'src/app/services/actividad.service';
import Actividad from 'src/app/models/actividad';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditActividadComponent } from '../edit/edit.actividad.component';

@Component({
	selector: 'app-admin-actividad',
  templateUrl: './admin.actividad.component.html',
  styleUrls: ['./admin.actividad.component.scss']
})
export class AdminActiviadComponent implements OnInit, AfterViewInit, OnDestroy {
	displayedColumns = ["titulo",'fecha', 'tipo', 'quienregistro', 'ubicacion', 'id'];
	dataSource = new MatTableDataSource<any>();
	actividades:  Actividad[];
	subscriptions = [];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	dialogRef:  MatDialogRef<EditActividadComponent>;
	constructor(private actividadService: ActividadService, private dialog: MatDialog) { }

	ngOnInit() {
    	this.retrieveTutorials(); 
	}

  retrieveTutorials(): void {
    this.subscriptions.push(this.actividadService.getAll().subscribe(data => {
      this.actividades = data;
      this.dataSource.data = this.actividades;
    }));
  }

	ngAfterViewInit() {
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	eliminar(element) {
		if (window.confirm("Desea eliminar la actividad?")) { 
			this.actividadService.delete(element.key);
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach(s => s.unsubscribe());
	}

	editActividad(actividad){
		this.showModal(actividad);
	}
	nuevaActividad(){
		this.showModal(null);
	}

	showModal(actividad){
		this.dialogRef = this.dialog.open(EditActividadComponent, {
			height: '800px',
			width: '800px',
			data: actividad
		});
		
		this.subscriptions.push(this.dialogRef.afterClosed().subscribe(result => {
			// if (result && result.result === true) {
			// 	mov.afipCAE = result.cae;
			// 	this.notificationService.notification$.next({message: result.msj, action:'Ok'});
			// }
		}));
	}
	cancelarEdicion() {
		this.dialogRef.close({ update: false });
	  }
}