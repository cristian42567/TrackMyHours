import { Injectable } from '@angular/core';
import { HorasExtras } from '../interfaces/horasExtras';

@Injectable({
  providedIn: 'root'
})
export class HorasExtrasService {

  private horasExtra: HorasExtras[] = [];
  private siguienteId = 1;
  private llaveAlmacenamiento = "horasExtras";

  constructor() { 
    this.cargarHorasExtras();
  }

  private cargarHorasExtras(): void {
    const horas = localStorage.getItem(this.llaveAlmacenamiento);
    if (horas) {
      this.horasExtra = JSON.parse(horas);
      if(this.horasExtra.length > 0){
        this.siguienteId = Math.max(...this.horasExtra.map(h => h.id))+1;
      }
    }
  }

  private guardarHorasExtras(): void {
    localStorage.setItem(this.llaveAlmacenamiento, JSON.stringify(this.horasExtra));
  }

  añadirHorasExtras(horasExtras: HorasExtras): void {
    horasExtras.id = this.siguienteId++;
    this.horasExtra.push(horasExtras);
    this.guardarHorasExtras();
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
      this.guardarHorasExtras();
    }
  }

  borrarHorasExtras(id: number): void {
    const index = this.horasExtra.findIndex(eh => eh.id === id);
    if (index !== -1) {
      this.horasExtra.splice(index, 1);
      this.guardarHorasExtras();
    }
  }
}
