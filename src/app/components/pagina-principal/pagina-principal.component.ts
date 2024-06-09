import { Component, EventEmitter, Output } from '@angular/core';
import { RegistroComponent } from "../registro/registro.component";
import { DatosLogin } from '../../interfaces/datos-login';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
export class PaginaPrincipalComponent {

    formularioAbierto:boolean = false;

    cambiarFormulario(){
        this.formularioAbierto = !this.formularioAbierto
    }

    @Output() usuarioLogueado: EventEmitter<void> = new EventEmitter<void>();

    constructor(private router: Router){}

    usuario:DatosLogin={
        usuario:"",
        contrasena:""
    }

    login(){
        if(this.usuario.usuario=="admin" && this.usuario.contrasena=="admin"){
            this.usuarioLogueado.emit();
            
            this.router.navigate(['/homeLogin'])
        }else{
            alert("Usuario o contraseña incorrecta")
        }    

        this.usuario.usuario=""
        this.usuario.contrasena=""
    }
}