import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroData } from '../../interfaces/registro-data';
import { Router } from '@angular/router';

@Component({
  selector: 'registro',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RegistroComponent,
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  @Output() usuarioRegistrado: EventEmitter<void> = new EventEmitter<void>();
  constructor(private router: Router){}


  registerData: RegistroData = {
    nombre: "",
    usuario: "",
    contrasena: "",
    confirmarContrasena: ""

  }
  registro() {
    if (this.registerData.nombre == ""
      || this.registerData.usuario == ""
      || this.registerData.contrasena == ""
      || this.registerData.confirmarContrasena == "") {
      alert("Todos los campos son obligatorios")
    }else if (this.registerData.contrasena != this.registerData.confirmarContrasena) {
      alert("Las contraseñas no coinciden")
    }else{
      this.router.navigate(['/homeLogin'])
    }

    this.registerData.nombre = ""
    this.registerData.usuario = ""
    this.registerData.contrasena = ""
    this.registerData.confirmarContrasena = ""

  }

}
