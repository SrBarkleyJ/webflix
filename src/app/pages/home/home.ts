import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tmdb.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'] 
})
export class Home implements OnInit {
  popularMovies: Movie[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private tmdbService: TmdbService) {}

  ngOnInit() {
    this.loadPopularMovies();
  }

  loadPopularMovies() {
    this.tmdbService.getPopularMovies().subscribe({
      next: (response: any) => {
        this.popularMovies = response.results;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading movies:', error);
        this.error = 'Failed to load movies. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}