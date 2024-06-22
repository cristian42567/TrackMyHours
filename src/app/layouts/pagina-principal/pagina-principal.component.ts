import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RegistroComponent } from '../../components/registro/registro.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';


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
export class PaginaPrincipalComponent implements OnInit {

    formularioAbierto: boolean = false;

    cambiarFormulario() {
        this.formularioAbierto = true
    }

    cerrarFormularioRegistro() {
        this.formularioAbierto = false;
    }

    //TODO: Mirar login
    @Output() usuarioLogueado: EventEmitter<void> = new EventEmitter<void>();

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private servicio: UserService
    ) { }
    ngOnInit(): void {
        this.formularioLogin = this.formBuilder.group({
            usuario: ["", [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(20)
            ]],
            contrasena: ["", [
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(20),
            ]],
        })
    }

    formularioLogin: FormGroup = new FormGroup({
        usuario: new FormControl(""),
        contrasena: new FormControl("")
    })

    //TODO: Quitar alerts
    login() {
        const usuario = this.formularioLogin.get("usuario")?.value
        const contraseña = this.formularioLogin.get("contrasena")?.value

        let loginCorrecto = this.servicio.login(this.formularioLogin.get("usuario")?.value,
            this.formularioLogin.get("contrasena")?.value)

        if (loginCorrecto) {
            this.usuarioLogueado.emit();

            this.router.navigate(['/homeLogin']);
        } else if (usuario == "" || contraseña == "") {
            alert("Debes rellenar todos los campos")
        } else if (!loginCorrecto) {
            alert("Usuario o contraseña incorrectos")
        }

        this.formularioLogin.get("usuario")?.setValue("")
        this.formularioLogin.get("contrasena")?.setValue("")

    }

}