import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'Track My Hours - Entrar o registrarse',
        loadComponent: () => import('./layouts/home/home.component').then(m => m.HomeComponent)
    },
];
