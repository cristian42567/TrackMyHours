import { Component, OnInit } from '@angular/core';
import { HorasExtrasService } from '../../services/horas-extras.service';
import { HorasExtras } from '../../interfaces/horasExtras';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-ver-horas',
  standalone: true,
  imports: [ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './ver-horas.component.html',
  styleUrl: './ver-horas.component.css'
})
export class VerHorasComponent implements OnInit {

  horasExtra: HorasExtras[] = [];
  editarForm: FormGroup;
  editandoId: number | null = null;
  constructor(
    private horasExtrasService: HorasExtrasService,
    private formBuilder: FormBuilder
  ) { 
    this.editarForm = this.formBuilder.group({
      id: [''],
      date: ['', Validators.required],
      horas: ['', Validators.required, Validators.min(1)],
    })
  }

  ngOnInit(): void {
    this.horasExtra = this.horasExtrasService.obtenerHorasExtras();
  }

  editarHoras(horasExtras: HorasExtras): void {
    this.editandoId = horasExtras.id;
    this.editarForm.setValue({
      date: horasExtras.date,
      horas: horasExtras.horas,
      descrpcion: horasExtras.descripcion
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
        ...this.editarForm.value
      };
      this.horasExtrasService.actualizarHorasExtras(editarHoras);
      this.horasExtra = this.horasExtrasService.obtenerHorasExtras();
      this.cancelarEdicion();
    }
  }

  buscarPorId(e: number, i: HorasExtras): number {
    return i.id
  }
}


