import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import Actividad from '../models/actividad';


@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private dbPath = '/Actividad';

  actividadRef: AngularFireList<Actividad> = null;

  constructor(private db: AngularFireDatabase) {
    this.actividadRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<Actividad> {
    return this.actividadRef;
  }

  create(tutorial: Actividad): any {
    return this.actividadRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.actividadRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.actividadRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.actividadRef.remove();
  }
}