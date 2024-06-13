import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegistroComponent } from "../registro/registro.component";
import { DatosLogin } from '../../interfaces/datos-login';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'paginaPricnipal',
    standalone: true,
    templateUrl: './pagina-principal.component.html',
    styleUrl: './pagina-principal.component.css',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RegistroComponent,
    ]
})
export class PaginaPrincipalComponent implements OnInit{

    formularioAbierto:boolean = false;

    cambiarFormulario(){
        this.formularioAbierto = !this.formularioAbierto
    }

    //TODO: Mirar login
    @Output() usuarioLogueado: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private router: Router,
        private formBuilder: FormBuilder
    ){}
    ngOnInit(): void {
        this.formularioLogin = this.formBuilder.group({
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
            ]]
        })
    }

    formularioLogin:FormGroup = new FormGroup({
        usuario: new FormControl(''),
        contrasena: new FormControl(''),
    })

    login(){
        if(this.formularioLogin.get('usuario')?.value=="admin" 
        && this.formularioLogin.get('contrasena')?.value=="admin"){
            this.usuarioLogueado.emit();
            
            this.router.navigate(['/homeLogin'])
        }else{
            alert("Usuario o contraseña incorrecta")
        }    

        this.formularioLogin.get('usuario')?.setValue("")       
        this.formularioLogin.get('contrasena')?.setValue("")
    }
}