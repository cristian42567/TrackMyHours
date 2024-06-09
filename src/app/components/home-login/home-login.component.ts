import { Component } from '@angular/core';
import { TopBarComponent } from "../top-bar/top-bar.component";

@Component({
    selector: 'app-home-login',
    standalone: true,
    templateUrl: './home-login.component.html',
    styleUrl: './home-login.component.css',
    imports: [TopBarComponent]
})
export class HomeLoginComponent {

}
