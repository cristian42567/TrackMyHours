import { Component, OnInit } from '@angular/core';
import { HorasExtrasService } from '../../services/horas-extras.service';
import { HorasExtras } from '../../interfaces/horasExtras';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, registerLocaleData } from '@angular/common';
import { Router } from '@angular/router';
import { HorasPorMes } from '../../interfaces/horas-por-mes';
import localEs from '@angular/common/locales/es';


registerLocaleData(localEs, 'es');

@Component({
  selector: 'app-ver-horas',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './ver-horas.component.html',
  styleUrl: './ver-horas.component.css',
  providers: [DatePipe]
})

export class VerHorasComponent implements OnInit {

  constructor(
    private horasExtrasService: HorasExtrasService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.horasExtra = this.horasExtrasService.obtenerHorasExtras();

    this.editarForm = this.formBuilder.group({
      date: ["", [
        Validators.required,
      ]],
      horas: ["", [
        Validators.required,
        Validators.min(1),
      ]],
      descripcion: ["", [
        Validators.required
      ]],
    })
  }

  editarForm: FormGroup = new FormGroup({
    date: new FormControl(),
    horas: new FormControl(),
    descripcion: new FormControl(),
  })

  horasExtra: HorasExtras[] = [];
  horasPorMes: HorasPorMes[] = [];
  editandoId: number | null = null;
  vistaActual: string = 'totales';

  editarHoras(horasExtras: HorasExtras): void {
    this.editandoId = horasExtras.id;
    this.editarForm.setValue({
      date: this.datePipe.transform(horasExtras.date, 'dd-MM-yyyy'),
      horas: horasExtras.horas,
      descripcion: horasExtras.descripcion
    });
  }

  eliminarHoras(id: number): void {
    this.horasExtrasService.borrarHorasExtras(id);
    this.horasExtra = this.horasExtrasService.obtenerHorasExtras();
  }

  cancelarEdicion(): void {
    this.editandoId = null;
    this.editarForm.reset();
  }

  guardarHoras(): void {
    if (this.editarForm.valid && this.editandoId !== null) {
      const editarHoras: HorasExtras = {
        id: this.editandoId,
        date: new Date(this.editarForm.value.date),
        horas: this.editarForm.value.horas,
        descripcion: this.editarForm.value.descripcion
      };
      this.horasExtrasService.actualizarHorasExtras(editarHoras);
      this.horasExtra = this.horasExtrasService.obtenerHorasExtras();
      this.cancelarEdicion();
    }
  }

  buscarPorId(i: HorasExtras): number {
    return i.id
  }

  formatearFecha(fecha: Date): string | null {
    return this.datePipe.transform(fecha, 'dd-MM-yyyy');
  }

  volverAtras(){
    this.router.navigate(['/home-login']);
  }

  mostrarHorasTotales(){
    this.vistaActual = 'totales';
  }

  mostrarHorasPorMes(){
    this.vistaActual = 'meses';
    this.clasificarPorMes();
  }

  sumatotalHoras():number{
      return this.horasExtra.reduce((sum, horasExtras) => sum + horasExtras.horas, 0);
  }

  clasificarPorMes():void{
    const horasPorMesMap: { [key:string]:number} = {}

    this.horasExtra.forEach(horaExtra => {
      const mes = this.datePipe.transform(horaExtra.date, 'MMMM yyyy', '', 'es');
      if (mes) {
        if(!horasPorMesMap[mes]){
          horasPorMesMap[mes] = 0;
        }
        horasPorMesMap[mes] += horaExtra.horas;
      }
    })

    this.horasPorMes= Object.keys(horasPorMesMap).map(mes => ({
      mes,
      totalHoras: horasPorMesMap[mes]
    }))
  }
}


