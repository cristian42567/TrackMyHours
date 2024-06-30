import { Component, OnInit } from '@angular/core';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { HorasExtras } from '../../interfaces/horasExtras';
import { HorasExtrasService } from '../../services/horas-extras.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'app-home-login',
    standalone: true,
    templateUrl: './home-login.component.html',
    styleUrl: './home-login.component.css',
    imports: [TopBarComponent,
        ReactiveFormsModule,
        FormsModule,
    ]
})

export class HomeLoginComponent implements OnInit {

    horasExtra: HorasExtras[] = [];
    hayHorasExtras: boolean = false;

    constructor(
        private horasExtrasService: HorasExtrasService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) { }

    ngOnInit(): void {
        this.horasExtras = this.formBuilder.group({
            date: ["", [
                Validators.required,
            ]],
            horas: ["", [
                Validators.required,
            ]],
            descripcion: ["", [
                Validators.required,
            ]],
        })
        this.horasExtra = this.horasExtrasService.obtenerHorasExtras();
        this.hayHorasExtras = this.horasExtra.length > 0;
    }

    horasExtras: FormGroup = new FormGroup({
        id: new FormControl(),
        date: new FormControl(),
        horas: new FormControl(),
        descripcion: new FormControl(),
    });

    agregarHorasExtras(): void {
        if (this.horasExtras.valid) {
            this.horasExtrasService.añadirHorasExtras(this.horasExtras.value);
            this.horasExtra = this.horasExtrasService.obtenerHorasExtras();
            this.hayHorasExtras = this.horasExtra.length > 0;
            this.horasExtras.reset();
        } 
        this.horasExtras.get("date")?.setValue("");
        this.horasExtras.get("horas")?.setValue("");
        this.horasExtras.get("descripcion")?.setValue("");
    }

    cargarVista() {
        this.router.navigate(['/mostrar-horas'])
    }

    aviso(){
        if(this.horasExtras.invalid){
            alert("Debes rellenar todos los campos")
        }
    }

}
