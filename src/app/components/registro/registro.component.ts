import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
export class RegistroComponent implements OnInit {

  //TODO: Mirar registro
  @Output() usuarioRegistrado: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder
  ){}
  
  ngOnInit(): void {
    this.formularioRegistro = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
    ]],
      usuario: ['', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
      ]],
      contrasena: ['', [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
      ]],
      confirmarContrasena: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
    ]],
  })
  }

  formularioRegistro:FormGroup = new FormGroup({
    nombre: new FormControl(''),
    usuario: new FormControl(''),
    contrasena: new FormControl(''),
    confirmarContrasena: new FormControl('')
})

  registro() {
    const nombreUsuario = this.formularioRegistro.get('nombre')?.value
    const Usuario = this.formularioRegistro.get('usuario')?.value
    const contraseña = this.formularioRegistro.get('contrasena')?.value
    const confirmarContraseña = this.formularioRegistro.get('confirmarContrasena')?.value

    if (contraseña != confirmarContraseña) {
      alert("Las contraseñas no coinciden")
    }else{
      this.router.navigate(['/homeLogin'])
      alert("Te has registrado correctamente")
    }

    this.formularioRegistro.get('nombre')?.setValue("") 
    this.formularioRegistro.get('usuario')?.setValue("")
    this.formularioRegistro.get('contrasena')?.setValue("")
    this.formularioRegistro.get('confirmarContrasena')?.setValue("")

  }

  cerrarFormulario(){
    
  }


}
