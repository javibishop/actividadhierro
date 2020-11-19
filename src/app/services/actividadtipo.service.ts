import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import ActividadTipo from '../models/actividadtipo';


@Injectable({
  providedIn: 'root'
})
export class ActividadtipoService {

  private dbPath = '/actividadtipo';

  tipoActividadRef: AngularFireList<ActividadTipo> = null;

  constructor(private db: AngularFireDatabase) {
    this.tipoActividadRef = db.list(this.dbPath);
  }

  getAll()  {
    return this.db.list("/actividadtipo", ref => ref.orderByChild("nombre"))
			.snapshotChanges()
			.pipe(
				map(action => {
					return action.map((item: any) => {
						const key = item.payload.key;
            const data = { key, ...item.payload.val() as ActividadTipo [] };
            data.key = key;
						return data;
					});
				})
      )
  }

  create(tutorial: ActividadTipo): any {
    return this.tipoActividadRef.push(tutorial);
  }

  update(key: string, value: any): Promise<void> {
    return this.tipoActividadRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.tipoActividadRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.tipoActividadRef.remove();
  }
}
