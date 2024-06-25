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
    }

    horasExtras: FormGroup = new FormGroup({
        id: new FormControl(),
        date: new FormControl(),
        horas: new FormControl(),
        descripcion: new FormControl(),
    });

    horaExtra: HorasExtras = {
        id: 0,
        date: new Date(),
        horas: 0,
        descripcion: ''
    }

    agregarHorasExtras(): void {

        this.horasExtrasService.añadirHorasExtras(this.horasExtras.value);
        

        this.horasExtras.get("id")?.setValue("")
        this.horasExtras.get("date")?.setValue("")
        this.horasExtras.get("horas")?.setValue("")
        this.horasExtras.get("descripcion")?.setValue("")
    }

    cargarVista(){
        this.router.navigate(['/mostrar-horas'])
    }

}
