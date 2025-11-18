import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(c => c.Home)
  },
  {
    path: 'movie/:id',
    loadComponent: () => import('./pages/movie-details/movie-details').then(c => c.MovieDetails)
  },
  {
    path: 'search', 
    loadComponent: () => import('./pages/search/search').then(c => c.Search)
  },
  {
    path: '**',
    redirectTo: ''
  }
];