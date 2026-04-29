import { Component, ElementRef, HostListener, input, output, signal } from '@angular/core';
import { DropdownModel } from '../../core/models/dropdown.model';

@Component({
  selector: 'app-dropdown-menu',
  imports: [],
  templateUrl: './dropdown-menu.html',
})
export class DropdownMenu {

  title = input<string>('Select');
  options = input.required<DropdownModel[]>();

  optionSelected = output<DropdownModel>();

  isOpen = signal(false);

  constructor(private eRef: ElementRef) {}

  toggle() {
    this.isOpen.update(v => !v);
  }

  itemSelected(option: DropdownModel) {
    this.optionSelected.emit(option);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }
}
