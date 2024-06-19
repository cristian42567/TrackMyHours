import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class RegistroComponent implements OnInit {

  //TODO: Mirar registro
  @Output() usuarioRegistrado: EventEmitter<void> = new EventEmitter<void>();
  @Output() cerrarFormulario: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ){}
  
  ngOnInit(): void {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ["", [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
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

  formularioRegistro:FormGroup = new FormGroup({
    nombre: new FormControl(""),
    usuario: new FormControl(""),
    contrasena: new FormControl(""),
    confirmarContrasena: new FormControl("")
})

  registro() {
    const contraseña = this.formularioRegistro.get("contrasena")?.value
    const confirmarContraseña = this.formularioRegistro.get("confirmarContrasena")?.value

    if (contraseña != confirmarContraseña) {
      alert("Las contraseñas no coinciden")
    }else{
      this.router.navigate(['/homeLogin'])
      alert("Te has registrado correctamente")
    }

    this.formularioRegistro.get("nombre")?.setValue("") 
    this.formularioRegistro.get("usuario")?.setValue("")
    this.formularioRegistro.get("contrasena")?.setValue("")
    this.formularioRegistro.get("confirmarContrasena")?.setValue("")

  }

  cerrarForm(){
    this.cerrarFormulario.emit();
  }


}
