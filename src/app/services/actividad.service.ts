import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import Actividad from '../models/actividad';
import ActividadTipo from '../models/actividadtipo';


@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  private dbPath = '/Actividad';

  actividadRef: AngularFireList<Actividad> = null;

  constructor(private db: AngularFireDatabase) {
    this.actividadRef = db.list(this.dbPath);
  }

  getAll() {
    return this.actividadRef.snapshotChanges()
			.pipe(
				map(action => {
					return action.map((item: any) => {
						const key = item.payload.key;
            const data = { key, ...item.payload.val() as Actividad };
            data.key = key;
						return data;
					});
				})
      )
  }

  // getAllWithRelated() : Actividad [] {
	// 	const dbref = this.db.database;
	// 	let query = dbref.ref('Actividad').orderByChild('fecha');
	// 	return query.once('value', (data: any) => {
  //     return data.val() as Order []
  //   });
	// }

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