import { Component, signal, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { FlashMessages } from './components/flash-message/flash-message';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, FlashMessages],
  templateUrl: './app.html',
})
export class App implements OnInit {
  protected readonly title = signal('my-movies-angular');
  private http = inject(HttpClient);

  ngOnInit() {
    // Check for any pending flash messages (e.g. after a redirect)
    this.http.get('/api/flash').subscribe();
  }
}
