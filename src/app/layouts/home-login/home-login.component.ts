import { Component } from '@angular/core';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'app-home-login',
    standalone: true,
    templateUrl: './home-login.component.html',
    styleUrl: './home-login.component.css',
    imports: [TopBarComponent]
})
export class HomeLoginComponent {

    constructor(
        private service: UserService
    ) { }

    textoDeBoton: string = "Hola " + this.service.usuarios

}
