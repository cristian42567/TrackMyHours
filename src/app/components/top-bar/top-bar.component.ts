import { Component } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'topBar',
  standalone: true,
  imports: [],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  constructor(private router: Router){}

  textoDeBoton:string = "Cerrar sesión";

  cerrarSesion(){
    this.router.navigate(['']);
  }

}
