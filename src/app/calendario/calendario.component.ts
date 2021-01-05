import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import { CalendarOptions, Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ActividadService } from '../services/actividad.service';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  calendarOptions: CalendarOptions;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;

  calendarEvents = [
    //{ title: 'event 1', date: '2021-01-01' }
  ];

  constructor(private actividadService: ActividadService){
    
  }
  getFecha(fecha: number): string{
    let f = new Date(fecha);
    let fstring = `${f.getUTCFullYear()}-${f.getUTCMonth()+1}-${f.getDate()}`;
    return fstring;
  }
  ngOnInit() {
    forwardRef(() => Calendar);
    this.actividadService.getAll().subscribe(data => {
			let actividades = data.sort((a, b) => b.fecha - a.fecha);
			actividades.forEach(a => {
				this.calendarEvents.push({title: a.actividadTipo?.nombre, date: this.getFecha(a.fecha)})
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
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this)
    };
  }
  handleDateClick(arg) {
    console.log(arg);
  }

  handleEventClick(arg) {
    console.log(arg);
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

}