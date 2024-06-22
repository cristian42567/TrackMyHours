import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'HoraFlox - Entrar o registrarse',
        loadComponent: () => import('./layouts/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'home-login',
        title: 'Página principal',
        loadComponent: () => import('./layouts/home-login/home-login.component').then(m => m.HomeLoginComponent)
    },
    {
        path: 'mostrar-horas',
        loadComponent: ()=> import('./components/ver-horas/ver-horas.component').then(m => m.VerHorasComponent)
    },
    {
        path: '**',
        loadComponent: ()=> import('./components/404/404.component').then(m => m.NotFoundComponent)
    },
    
];
