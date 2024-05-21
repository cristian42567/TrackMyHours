import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        title: 'home',
        loadComponent: () => import('./layouts/home/home.component').then(m => m.HomeComponent)
    },
];
