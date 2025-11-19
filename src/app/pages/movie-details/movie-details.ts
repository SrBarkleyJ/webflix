import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.css']
})
export class MovieDetails implements OnInit {

  movie: Movie = {
    id: 0,
    title: '',
    overview: '',
    poster_path: '',
    backdrop_path: '',
    release_date: '',
    vote_average: 0,
    vote_count: 0,
    popularity: 0,
    genre_ids: [],
    original_language: ''
  };

  constructor(
    private tmdbService: TmdbService,
    private route: ActivatedRoute   // <-- Aquí se inyecta correctamente
  ) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');

    if (movieId) {
      this.loadMovieDetails(Number(movieId)); // Convertimos string → number
    }
  }

  loadMovieDetails(movieId: number) {
    this.tmdbService.getMovieDetails(movieId).subscribe({
      next: (movie: Movie) => {
        this.movie = { ...this.movie, ...movie };
      },
      error: (err) => {
        console.error('Error loading movie details:', err);
      }
    });
  }
}
