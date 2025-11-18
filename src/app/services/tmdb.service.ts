import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = environment.tmdbApiKey;
  private baseUrl = environment.tmdbBaseUrl;

  constructor(private http: HttpClient) {}

  private get(endpoint: string, params: any = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const allParams = { ...params, api_key: this.apiKey };
    
    return this.http.get(url, { params: allParams });
  }

  getPopularMovies(page: number = 1) {
    return this.get('/movie/popular', { page });
  }

  searchMovies(query: string, page: number = 1) {
    return this.get('/search/movie', { query, page });
  }

  getMovieDetails(movieId: number) {
    return this.get(`/movie/${movieId}`);
  }

  getNowPlayingMovies(page: number = 1) {
    return this.get('/movie/now_playing', { page });
  }

  getTopRatedMovies(page: number = 1) {
    return this.get('/movie/top_rated', { page });
  }

  getUpcomingMovies(page: number = 1) {
    return this.get('/movie/upcoming', { page });
  }
}