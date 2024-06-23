import { Injectable, OnInit } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  constructor() {
    this.iniciar()
  }

  ngOnInit(): void {
    let usuarios = localStorage.getItem("usuarios")

    if (usuarios != null) {
      const arrayUsers: Array<User> = JSON.parse(usuarios).usuariosJson

      this.usuarios = arrayUsers
    }
  }

  userData: User = {
    nombre: "",
    usuario: "",
    correoElectronico: "",
    contrasena: "",
  }

  //SIMULACIÓN DE LA BASE DE DATOS
  usuarios: Array<User> = []

  iniciar(): void {
    let usuarios = localStorage.getItem("usuarios")

    if (usuarios != null) {
      const arrayUsers: Array<User> = JSON.parse(usuarios).usuariosJson
      this.usuarios = arrayUsers
    }
  }

  login(nombreDeUsuario: string, contraseña: string): Boolean {

    for (let i = 0; i < this.usuarios.length; i++) {
      if (nombreDeUsuario == this.usuarios[i].usuario) {

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

  registro(nombre: string, nombreDeUsuario: string, contraseña: string, confirmarContraseña: string, correoElectronico: string) {

    if (contraseña != confirmarContraseña) {
      return false;
    }

    let coinciden = false

    this.usuarios.forEach(usuario => {
      if (usuario.usuario == nombreDeUsuario || usuario.correoElectronico == correoElectronico) {
        coinciden = true
      }
    });

    if (coinciden) {
      return false
    }


    const nuevoUsuario: User = {
      usuario: nombreDeUsuario,
      nombre: nombre,
      correoElectronico: correoElectronico,
      contrasena: contraseña,
    }

    this.usuarios.push(nuevoUsuario)

    const objetoUsuarios = {
      usuariosJson: this.usuarios
    }

    localStorage.setItem("usuarios", JSON.stringify(objetoUsuarios))

    return true
  }


}
