import { Component, computed, contentChildren, ElementRef, HostListener, input, output, signal } from '@angular/core';
import { DropdownModel } from '../../core/models/dropdown.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu',
  imports: [NgClass],
  templateUrl: './dropdown-menu.html',
})
export class DropdownMenu {

  title = input<string>('Select');

  isOpen = signal(false);

  align = input<'left' | 'right'>('right');
  private nodes = contentChildren('dropdown-title', { descendants: true});

  hasContent = computed(() => this.nodes().length > 0);

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
