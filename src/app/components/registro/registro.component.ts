import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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
export class RegistroComponent implements OnInit {

  //TODO: Mirar registro
  @Output() usuarioRegistrado: EventEmitter<void> = new EventEmitter<void>();
  @Output() cerrarFormulario: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private servicio: UserService
  ) { }

  ngOnInit(): void {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]],
      correoElectronico: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.email
      ]],
      usuario: ["", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)
      ]],
      contrasena: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]],
      confirmarContrasena: ["", [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
      ]],
    })
  }

  formularioRegistro: FormGroup = new FormGroup({
    nombre: new FormControl(""),
    usuario: new FormControl(""),
    contrasena: new FormControl(""),
    confirmarContrasena: new FormControl("")
  })

  registro() {
    const nombre = this.formularioRegistro.get("nombre")?.value
    const nombreDeUsuario = this.formularioRegistro.get("usuario")?.value
    const contraseña = this.formularioRegistro.get("contrasena")?.value
    const confirmarContraseña = this.formularioRegistro.get("confirmarContrasena")?.value
    const correoElectronico = this.formularioRegistro.get("correoElectronico")?.value
    const registroConExito = this.servicio.registro(nombre, nombreDeUsuario, contraseña, confirmarContraseña, correoElectronico)

    if (!registroConExito) {
      alert("Las contraseñas no coinciden")
    } else {
      this.router.navigate(['/home-login'])
      alert("Te has registrado correctamente")
    }

    this.formularioRegistro.get("nombre")?.setValue("")
    this.formularioRegistro.get("usuario")?.setValue("")
    this.formularioRegistro.get("contrasena")?.setValue("")
    this.formularioRegistro.get("confirmarContrasena")?.setValue("")

  }

  cerrarForm() {
    this.cerrarFormulario.emit();
  }


}
