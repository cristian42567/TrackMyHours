import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  userData = {
    nombre: "",
    usuario: "",
    correoElectronico: "",
    contrasena: "",
  }

  usuarios: Array<User> = [
    {
      nombre: "Cristian",
      usuario: "cristian4256",
      correoElectronico: "cristian42567@gmail.com",
      contrasena: "Carolina123",
    },
  ]

  login(nombreDeUsuario: string, contraseña: string): Boolean {

    for (let i = 0; i < this.usuarios.length; i++) {
      if (nombreDeUsuario == this.usuarios[i].correoElectronico
        || nombreDeUsuario == this.usuarios[i].usuario){

        if (contraseña == this.usuarios[i].contrasena) {
          this.userData = this.usuarios[i]
          return true
        }
      }

    }
    this.userData = {
      nombre: "",
      usuario: "",
      correoElectronico: "",
      contrasena: "",
    }

    return false
  }


}
