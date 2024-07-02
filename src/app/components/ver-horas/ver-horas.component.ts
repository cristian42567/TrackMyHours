import { Component, OnInit } from '@angular/core';
import { HorasExtrasService } from '../../services/horas-extras.service';
import { HorasExtras } from '../../interfaces/horasExtras';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

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
    private datePipe: DatePipe
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
  editandoId: number | null = null;

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

  buscarPorId(e: number, i: HorasExtras): number {
    return i.id
  }

  formatearFecha(fecha: Date): string | null {
    return this.datePipe.transform(fecha, 'dd-MM-yyyy');
  }
}


