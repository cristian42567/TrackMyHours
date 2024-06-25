import { Injectable } from '@angular/core';
import { HorasExtras } from '../interfaces/horasExtras';

@Injectable({
  providedIn: 'root'
})
export class HorasExtrasService {

  private horasExtra: HorasExtras[] = [];
  private siguienteId = 1;

  constructor() { }

  añadirHorasExtras(horasExtras: HorasExtras): void {
    horasExtras.id = this.siguienteId++;
    this.horasExtra.push(horasExtras);
  }


  obtenerHorasExtras(): HorasExtras[] {
    return this.horasExtra;
  }

  obtenerHorasExtrasPorId(id: number): HorasExtras | undefined {
    return this.horasExtra.find(eh => eh.id === id);
  }

  actualizarHorasExtras(horasExtras: HorasExtras): void {
    const index = this.horasExtra.findIndex(eh => eh.id === horasExtras.id);
    if (index !== -1) {
      this.horasExtra[index] = horasExtras;
    }
  }

  borrarHorasExtras(id: number): void {
    const index = this.horasExtra.findIndex(eh => eh.id === id);
    if (index !== -1) {
      this.horasExtra.splice(index, 1);
    }
  }
}
