import { Component, OnInit } from '@angular/core';
import { HorasExtrasService } from '../../services/horas-extras.service';
import { HorasExtras } from '../../interfaces/horasExtras';

@Component({
  selector: 'app-ver-horas',
  standalone: true,
  imports: [],
  templateUrl: './ver-horas.component.html',
  styleUrl: './ver-horas.component.css'
})
export class VerHorasComponent implements OnInit{

  horasExtras: HorasExtras[] = [];

  constructor(private horasExtrasService: HorasExtrasService) { }
  
  ngOnInit(): void {
    this.horasExtras = this.horasExtrasService.obtenerHorasExtras();
  }

}
