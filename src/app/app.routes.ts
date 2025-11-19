import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MovieDetails } from './pages/movie-details/movie-details';
import { Search } from './pages/search/search';

export const routes: Routes = [
  {
    path: '',
    component: Home  // ✅ Eager loading en lugar de lazy
  },
  {
    path: 'movie/:id', 
    component: MovieDetails  // ✅ Eager loading
  },
  {
    path: 'search',
    component: Search  // ✅ Eager loading
  },
  {
    path: '**',
    redirectTo: ''
  }
];