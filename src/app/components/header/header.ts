import { Component } from '@angular/core';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  imports: [FaIconComponent],
  templateUrl: './header.html',
})
export class Header {
  faMagnifyingGlass = faMagnifyingGlass;

}
