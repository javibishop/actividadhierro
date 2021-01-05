import { Component, OnInit, ViewChild, forwardRef, OnDestroy } from '@angular/core';
import { CalendarOptions, Calendar, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ActividadService } from '../services/actividad.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditActividadComponent } from '../actividad/edit/edit.actividad.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit, OnDestroy {

  calendarOptions: CalendarOptions;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
  dialogRef:  MatDialogRef<EditActividadComponent>;
  subscriptions = [];
  actividades = [];
  calendarEvents = [];

  constructor(private actividadService: ActividadService, private dialog: MatDialog){
    
  }
  getFecha(fecha: number): string{
    let f = new Date(fecha);
    let fstring = `${f.getUTCFullYear()}-${f.getUTCMonth()+1}-${f.getDate()}`;
    return fstring;
  }
  ngOnInit() {
    forwardRef(() => Calendar);
    this.actividadService.getAll().subscribe(data => {
			this.actividades = data.sort((a, b) => b.fecha - a.fecha);
			this.actividades.forEach(a => {
				this.calendarEvents.push({title: `${a.actividadTipo?.nombre} \n ${a.ubicacion} - ${a.participantes}`, date: this.getFecha(a.fecha), id: a.key})
      });
      this.setCalendarConfig();
    });
    // need for load calendar bundle first
  

    

    //https://fullcalendar.io/docs/v4/angular
  }

  setCalendarConfig(){
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      editable: true,
      locale:['es'],
      events: this.calendarEvents,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: function () {
            alert('clicked the custom button!');
          }
        }
      },
      headerToolbar: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth'
      },
      //select: this.handleDateSelect.bind(this),
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this)
    };
  }
  handleDateClick(arg) {
    console.log(arg);
  }

  handleEventClick(arg) {
    this.showModal(arg);
  }

  handleEventDragStop(arg) {
    console.log(arg);
  }

  updateHeader() {
    this.calendarOptions.headerToolbar = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: ''
    };
  }

  updateEvents() {
    const nowDate = new Date();
    const yearMonth = nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);

    this.calendarOptions.events = [{
      title: 'Updaten Event',
      start: yearMonth + '-08',
      end: yearMonth + '-10'
    }];
  }
	ngOnDestroy() {
		this.subscriptions.forEach(s => s.unsubscribe());
  }
  
  showModal(clickInfo: EventClickArg) {
    const index = this.actividades.findIndex(a => a.key === clickInfo.event.id);
    if(index > -1){
      let actividad = this.actividades[index];
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
    
	}
	cancelarEdicion() {
		this.dialogRef.close({ update: false });
	}

}