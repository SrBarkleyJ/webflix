import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';
import moviesData from '../../assets/data/movies.json';
import { GENRES } from '../../assets/data/genres';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private movies: Movie[] = (moviesData as any).movies;
 private _genres = GENRES;
  getMovieDetails(movieId: number): Observable<Movie> {
    const movie = this.movies.find(m => m.id === movieId);
    
    if (movie) {
      return of(movie);
    } else {
      throw new Error('Movie not found');
    }
  }

  getPopularMovies(): Observable<{ results: Movie[] }> {
    return of({ results: this.movies });
  }

  searchMovies(query: string): Observable<{ results: Movie[] }> {
    const filtered = this.movies.filter(m => 
      m.title.toLowerCase().includes(query.toLowerCase())
    );
    return of({ results: filtered });
  }
   get genres() {
    return this._genres;
  }
}