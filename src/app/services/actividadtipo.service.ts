import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import ActividadTipo from '../models/actividadtipo';


@Injectable({
  providedIn: 'root'
})
export class ActividadtipoService {

  private dbPath = '/actividadtipo';

  tutorialsRef: AngularFireList<ActividadTipo> = null;

  constructor(private db: AngularFireDatabase) {
    this.tutorialsRef = db.list(this.dbPath);
  }

  getAll(): AngularFireList<ActividadTipo> {
    return this.tutorialsRef;
  }

  create(tutorial: ActividadTipo): any {
    return this.tutorialsRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.tutorialsRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.tutorialsRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.tutorialsRef.remove();
  }
}
