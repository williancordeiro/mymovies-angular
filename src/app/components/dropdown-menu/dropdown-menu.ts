import { Component, ElementRef, HostListener, input, output, signal } from '@angular/core';
import { DropdownModel } from '../../core/models/dropdown.model';

@Component({
  selector: 'app-dropdown-menu',
  imports: [],
  templateUrl: './dropdown-menu.html',
})
export class DropdownMenu {

  title = input<string>('Select');

  isOpen = signal(false);

  constructor(private eRef: ElementRef) {}

  toggle() {
    this.isOpen.update(v => !v);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
