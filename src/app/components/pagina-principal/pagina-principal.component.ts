import { Component } from '@angular/core';
import { RegistroComponent } from "../registro/registro.component";
import { DatosLogin } from '../../interfaces/datos-login';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'paginaPricnipal',
    standalone: true,
    templateUrl: './pagina-principal.component.html',
    styleUrl: './pagina-principal.component.css',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RegistroComponent
    ]
})
export class PaginaPrincipalComponent {

    formularioAbierto:boolean = false;

    cambiarFormulario(){
        this.formularioAbierto = !this.formularioAbierto
    }

    usuario:DatosLogin={
        usuario:"",
        contrasena:""
    }

    login(){
        if(this.usuario.usuario=="admin" && this.usuario.contrasena=="admin"){
            
        }    

        this.usuario.usuario=""
        this.usuario.contrasena=""
    }
}