import { Injectable } from '@angular/core';
import { HorasExtras } from '../interfaces/horasExtras';

@Injectable({
  providedIn: 'root'
})
export class HorasExtrasService {

  private horasExtra: HorasExtras[] = [];
  private siguienteId: number = 1;

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

  actualizarHorasExtras(actualizarHorasExtras: HorasExtras): void {
    const index = this.horasExtra.findIndex(eh => eh.id === actualizarHorasExtras.id);
    if (index !== -1) {
      this.horasExtra[index] = actualizarHorasExtras;
    }
  }

  borrarHorasExtras(id: number): void {
    const index = this.horasExtra.findIndex(eh => eh.id === id);
    if (index !== -1) {
      this.horasExtra.splice(index, 1);
    }
  }
}
