import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieRating } from './movie-rating';

describe('MovieRating', () => {
  let component: MovieRating;
  let fixture: ComponentFixture<MovieRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieRating],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieRating);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
