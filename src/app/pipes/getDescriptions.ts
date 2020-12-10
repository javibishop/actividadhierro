// truncate.ts
import {Pipe, PipeTransform} from '@angular/core';
import { ConstService } from '../services/const.service';

@Pipe({
  name: 'getDescriptions'
})
export class getDescriptions implements PipeTransform{
    constructor(private constService: ConstService) {
    }

    transform(value: any, type: string) : string {
      switch(type){
        case 'usuarias':
          if(value){
            let nombres = '';
            value.forEach(u => {
              let uNombre = this.constService.getUsuariasDesc(Number(u));
              nombres = nombres.concat(uNombre, '-');
            });
            return nombres;
          }else{
            return this.constService.getUsuariasDesc(Number(value));
          }
      }
    }
}