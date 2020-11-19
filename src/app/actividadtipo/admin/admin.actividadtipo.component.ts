
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from "@angular/core";
import { Subscription } from "rxjs";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import ActividadTipo from '../../models/actividadtipo'
import {ActividadtipoService} from '../../services/actividadtipo.service'
import { map } from 'rxjs/operators';
import { EditActividadTipoComponent } from '../edit/edit.actividadtipo.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-admin-actividad-tipo',
  templateUrl: './admin.actividadtipo.component.html',
  styleUrls: ['./admin.actividadtipo.component.scss']
})
export class AdminActiviadTipoComponent implements OnInit, AfterViewInit, OnDestroy {
	Impuesto: ActividadTipo;
	subscriptions = [];
	displayedColumns = ["nombre", "descripcion","activo", "id"];
	dataSource = new MatTableDataSource<any>();
	actividadesTipo:  ActividadTipo[];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;
	dialogRef:  MatDialogRef<EditActividadTipoComponent>;
	constructor(private actividadTipoService: ActividadtipoService, private dialog: MatDialog) { }

	ngOnInit() {
    	this.retrieveTutorials();
	}

  retrieveTutorials(): void {
	this.subscriptions.push(this.actividadTipoService
	.getAll()
	.subscribe(data => {
		this.dataSource.data = data;
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

	habilitarIn(element) {
		if (!element.available) {
			element.available = false;
		}
		element.available = !element.available;
		//this.impuestoService.update(element.key, element); 
	}
	ngOnDestroy() {
		this.subscriptions.forEach(s => s.unsubscribe());
	}

	editActividadTipo(tipoActividad){
		this.showModal(tipoActividad);
	}
	nuevaActividadTipo(){
		this.showModal(null);
	}

	showModal(tipoActividad){
		this.dialogRef = this.dialog.open(EditActividadTipoComponent, {
			height: '400px',
			width: '600px',
			data: tipoActividad
		});
		
		this.subscriptions.push(this.dialogRef.afterClosed().subscribe(result => {
			
		}));
	}
	cancelarEdicion() {
		this.dialogRef.close({ update: false });
	  }
}