import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { TmdbService } from '../../services/tmdb.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class Search implements OnInit, OnDestroy {
  searchResults: Movie[] = [];
  isLoading = false;
  searchQuery = '';
  totalResults = 0;
  error: string | null = null;

  private searchTerms = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private tmdbService: TmdbService
  ) {}

  ngOnInit() {
    // Setup search debouncing
    this.searchTerms
      .pipe(
        debounceTime(300), // Reducido para búsqueda local
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(query => {
        this.performSearch(query);
      });

    // Check for initial search query in URL
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      if (query) {
        this.searchQuery = query;
        this.searchTerms.next(query);
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearchInput(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery = query;
    this.searchTerms.next(query);
  }

  performSearch(query: string) {
    if (!query.trim()) {
      this.searchResults = [];
      this.totalResults = 0;
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.tmdbService.searchMovies(query).subscribe({
      next: (response: any) => {
        this.searchResults = response.results;
        this.totalResults = response.results.length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Search error:', error);
        this.error = 'Failed to search movies. Please try again.';
        this.isLoading = false;
        this.searchResults = [];
      }
    });
  }
}