import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { SearchService } from '../../core/services/search.service';
import { DatePipe, NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardMovieSearchResult } from '../../components/card-movie-search-result/card-movie-search-result';

@Component({
  selector: 'app-search-result-page',
  imports: [CardMovieSearchResult],
  templateUrl: './search-result-page.html',
})
export class SearchResultPage implements OnInit {
  public searchService = inject(SearchService);
  private route = inject(ActivatedRoute);
  
  currentPage = signal(1);
  itemsPerPage = 10;

  paginatedResults = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.searchService.results().slice(start, start + this.itemsPerPage);
  });

  totalPages = computed(() => Math.ceil(this.searchService.totalResults() / this.itemsPerPage));

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = params['q'];
      if (query) {
        this.searchService.triggerSearch(query);
      }
    });
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
