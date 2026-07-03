import { Component, inject, input, output, signal } from '@angular/core';
import { FlashService } from '../../core/services/flash';
import { FlashMessages } from '../flash-message/flash-message';
import { MovieService } from '../../core/services/movie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Tag } from '../../core/models/tag';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-movie-rating',
  imports: [FlashMessages, FontAwesomeModule, ReactiveFormsModule, NgClass],
  templateUrl: './movie-rating.html',
})
export class MovieRating {
  faStar = faStar;

  private service = inject(MovieService);
  private flashService = inject(FlashService);

  movieId = input.required<number>();
  userRating = input<number>(0);
  ratingSaved = output<number>();
  tempRating = signal<number>(0);
  selectedTags = signal<string>('');

  closeForm = output<void>();

  allTags = signal<Tag[]>([]);

  tagsControl = new FormGroup({
    tags: new FormControl<number[]>([], { nonNullable: true })
  })

  ngOnInit() {
    this.tempRating.set(this.userRating());
    this.service.getAllTags().subscribe({
      next: (tags) => {
        //console.log('Tags recebidas:', respose);
        this.allTags.set(tags);
      },
      error: (err) => {
        console.error('Erro ao buscar tags:', err);
      }
    });
  }

  toogleTag(tagId: number) {
    const currentTagSelection = this.tagsControl.controls.tags.value;

    if (currentTagSelection.includes(tagId)) {
      const newTagSelection = currentTagSelection.filter(id => id !== tagId);
      this.tagsControl.controls.tags.setValue(newTagSelection);
    } else {
      this.tagsControl.controls.tags.setValue([...currentTagSelection, tagId]);
    }
  }

  onRatingSaved() {
    const movieId = this.movieId();
    const star = this.tempRating();
    const tags = this.tagsControl.controls.tags.value;

    this.service.saveRating(movieId, star, tags).subscribe({
      next: () => {
        this.ratingSaved.emit(star);
        this.closeForm.emit();
      },
      error: (err) => {
        console.error('Erro ao salvar nota:', err);
      }
    })
  }
}
