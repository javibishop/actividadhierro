
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { map } from 'rxjs/operators';
import { ActividadService } from 'src/app/services/actividad.service';
import Actividad from 'src/app/models/actividad';
import { MatDialog } from '@angular/material/dialog';
import { EditActividadComponent } from '../edit/edit.actividad.component';

@Component({
	selector: 'app-admin-actividad',
  templateUrl: './admin.actividad.component.html',
  styleUrls: ['./admin.actividad.component.scss']
})
export class AdminActiviadComponent implements OnInit, AfterViewInit, OnDestroy {
	displayedColumns = ["titulo",'fecha', 'tipo', 'ubicacion', 'id'];
	dataSource = new MatTableDataSource<any>();
	actividades:  Actividad[];
	subscriptions = [];
	@ViewChild(MatPaginator) paginator: MatPaginator;
	@ViewChild(MatSort) sort: MatSort;

	constructor(private actividadService: ActividadService, private dialog: MatDialog) { }

	ngOnInit() {
    	this.retrieveTutorials(); 
	}

  retrieveTutorials(): void {
    this.subscriptions.push(this.actividadService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
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

	editActividad(key){

	}
	nuevaActividad(){
		const dialogRef = this.dialog.open(EditActividadComponent, {
			height: '800px',
			width: '800px',
			data: null
		});
		
		this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
			// if (result && result.result === true) {
			// 	mov.afipCAE = result.cae;
			// 	this.notificationService.notification$.next({message: result.msj, action:'Ok'});
			// }
		}));
	}
}