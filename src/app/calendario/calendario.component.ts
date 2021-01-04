import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular/public_api';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth'
  // };
  constructor() { }

  ngOnInit(): void {
  }
  handleDateClick(arg) {
    alert('date click! ' + arg.dateStr)
  }
}

//https://fullcalendar.io/docs/angular