import { Injectable } from "@angular/core";
import { GenericList } from '../models/list-item.model';
import { UsuariasEnum } from '../models/usuarie';

@Injectable({
	providedIn: 'root'
})
export class ConstService {
	public usuariesStatus: GenericList = new GenericList();
	constructor() {
		this.usuariesStatus.list.push(
			{ id: UsuariasEnum.Analia, descripcion: 'Analia' },
			{ id: UsuariasEnum.Gabriela, descripcion: 'Gabriela' },
			{ id: UsuariasEnum.Geraldine, descripcion: 'Geraldine' },
			{ id: UsuariasEnum.Micaela, descripcion: 'Micaela' });
	}

	getUsuarias() {
		return this.usuariesStatus;
	}
	getUsuariasDesc(id: number): string {
		if (id !== undefined && id > 0) {
			return this.usuariesStatus.get(id).descripcion;
		} else {
			return 'Sin nombre';
		}
	}
}
