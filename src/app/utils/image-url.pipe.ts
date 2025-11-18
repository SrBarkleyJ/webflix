import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl',
  standalone: true
})
export class ImageUrlPipe implements PipeTransform {
  transform(posterPath: string | null, size: string = 'w500'): string {
    if (!posterPath) {
      return '/assets/images/no-poster.jpg';
    }
    return `https://image.tmdb.org/t/p/${size}${posterPath}`;
  }
}