
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { ActividadService } from 'src/app/services/actividad.service';
import Actividad from 'src/app/models/actividad';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditActividadComponent } from '../edit/edit.actividad.component';
import { ActividadtipoService } from "src/app/services/actividadtipo.service";
import { LoaderService } from "src/app/services/common/loader.service";

@Component({
	selector: 'app-admin-actividad',
	templateUrl: './admin.actividad.component.html',
	styleUrls: ['./admin.actividad.component.scss']
})
export class AdminActiviadComponent implements OnInit, AfterViewInit, OnDestroy {
	displayedColumns = ['fecha', 'tipo', 'titulo', 'quienregistro', 'ubicacion', 'id'];
	dataSource = new MatTableDataSource<any>();
	actividades: any;
	subscriptions = [];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	dialogRef: MatDialogRef<EditActividadComponent>;
	tipos: any[];
	actividadTipoKey: string;
	constructor(private actividadService: ActividadService, private dialog: MatDialog, private actividadTipoService: ActividadtipoService,
		private spinnerService: LoaderService) { }

	ngOnInit() {
		this.spinnerService.show();
		this.actividadTipoService.getAll().subscribe(data => this.tipos = data);
		this.subscriptions.push(this.actividadService.getAll().subscribe(data => {
			this.actividades = data.sort((a, b) => b.fecha - a.fecha);
			this.actividades.forEach(element => {
				element.tipoNombre = element.actividadTipo?.nombre;
			});
			this.dataSource.data = this.actividades;
			this.spinnerService.hide();
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

	filtrar(){
		this.subscriptions.push(this.actividadService.getAll().subscribe(data => {
			this.actividades = data.sort((a, b) => b.fecha - a.fecha);
			this.dataSource.data = this.actividades;
		}));
	}
	eliminar(element) {
		if (window.confirm("Desea eliminar la actividad?")) {
			this.actividadService.delete(element.key);
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach(s => s.unsubscribe());
	}

	editActividad(actividad) {
		this.showModal(actividad);
	}
	nuevaActividad() {
		this.showModal(null);
	}

	showModal(actividad) {
		this.dialogRef = this.dialog.open(EditActividadComponent, {
			height: '90%',
			width: '80%',
			data: actividad,
			disableClose: true
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

	tipoChange(tipo) {
		// let index = this.tipos.findIndex(t => t.key === tipo.target.value);
		// if(index > -1){
		//   this.actividad.actividadTipo = this.tipos[index];
		// }
	}
}