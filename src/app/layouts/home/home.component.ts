import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopBarComponent } from '../../components/top-bar/top-bar.component';
import { PaginaPrincipalComponent } from '../../components/pagina-principal/pagina-principal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, TopBarComponent, PaginaPrincipalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
