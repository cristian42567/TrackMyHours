import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'HoraFlox - Entrar o registrarse',
        loadComponent: () => import('./layouts/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'homeLogin',
        title: 'Página principal',
        loadComponent: () => import('./components/home-login/home-login.component').then(m => m.HomeLoginComponent)
    },
    {
        path: '**',
        loadComponent: ()=> import('./components/404/404.component').then(m => m.NotFoundComponent)
    }
];
