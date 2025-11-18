import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TmdbService } from '../../services/tmdb.service';
import { Movie } from '../../models/movie.model';
import { ImageUrlPipe } from '../../utils/image-url.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, RouterLink, ImageUrlPipe],
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.css']
})
export class MovieDetails implements OnInit {
  movie: Movie | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.loadMovieDetails(+movieId);
    }
  }
loadMovieDetails(movieId: number) {
  console.log('🟡 Starting loadMovieDetails with ID:', movieId);
  
  this.isLoading = true;
  this.error = null;
  
  this.tmdbService.getMovieDetails(movieId).subscribe({
    next: (movie: any) => {
      console.log('✅ Movie details loaded successfully:', movie);
      console.log('🎬 Movie title:', movie?.title);
      console.log('🆔 Movie ID:', movie?.id);
      
      this.movie = movie;
      this.isLoading = false;
    },
    error: (error) => {
      console.error('❌ Error loading movie details:', error);
      console.error('🔧 Error details:', {
        status: error.status,
        statusText: error.statusText,
        message: error.message,
        url: error.url
      });
      this.error = 'Failed to load movie details. Please try again later.';
      this.isLoading = false;
    }
  });
}
}