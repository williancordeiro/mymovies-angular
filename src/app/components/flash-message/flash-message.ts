import { Component, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FlashService } from '../../core/services/flash';

@Component({
  selector: 'app-flash-message',
  standalone: true,
  imports: [NgClass],
  template: `
    <div [ngClass]="isGlobal() ? 'fixed bottom-4 right-4 z-[9999] flex flex-col gap-2' : 'w-full mb-6'">
      @for (flash of flashService.messages(); track flash) {
        <div 
          class="px-4 py-3 rounded border flex items-center transition-all duration-300"
          [ngClass]="{
            'bg-green-500/10 border-green-500/50 text-green-400': flash.type === 'success',
            'bg-red-500/10 border-red-500/50 text-red-400': flash.type === 'danger',
            'shadow-xl min-w-[300px] animate-slide-in-right': isGlobal(),
            'w-full animate-fade-in': !isGlobal()
          }"
        >
          <span class="text-xs font-bold uppercase tracking-tight">{{ flash.message }}</span>
        </div>
      }
    </div>
  `,
  styles: [`
    @keyframes slide-in-right {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fade-in {
      from { transform: translateY(-5px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .animate-slide-in-right {
      animation: slide-in-right 0.3s cubic-bezier(0, 0, 0.2, 1) forwards;
    }
    .animate-fade-in {
      animation: fade-in 0.2s ease-out forwards;
    }
  `]
})
export class FlashMessages {
  isGlobal = input<boolean>(true);
  protected readonly flashService = inject(FlashService);
}
