import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-card-movie',
  imports: [RouterLink, FontAwesomeModule, DatePipe, DecimalPipe],
  templateUrl: './card-movie.html',
})
export class CardMovie {
  @Input({ required: true }) movie!: Movie;
  faStar = faStar;
}
