import { Component } from '@angular/core';
import { RegistroComponent } from "../registro/registro.component";

@Component({
    selector: 'paginaPricnipal',
    standalone: true,
    templateUrl: './pagina-principal.component.html',
    styleUrl: './pagina-principal.component.css',
    imports: [RegistroComponent]
})
export class PaginaPrincipalComponent {

}
