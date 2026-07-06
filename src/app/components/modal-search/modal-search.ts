import { Component, HostListener, inject, output } from '@angular/core';
import { SearchService } from '../../core/services/search.service';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal-search',
  imports: [RouterLink, DatePipe],
  templateUrl: './modal-search.html',
})
export class ModalSearch {
  public searchService = inject(SearchService);
  closeModal = output<void>();

  @HostListener('document:keydown.escape')
  onKeydownHandler() {
    this.closeModal.emit();
  }
}
