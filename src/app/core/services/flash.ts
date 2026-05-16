import { Injectable, signal } from '@angular/core';

export interface FlashMessage {
  type: 'success' | 'warning' | 'danger';
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class FlashService {
  private messagesSignal = signal<FlashMessage[]>([]);
  public readonly messages = this.messagesSignal.asReadonly();

  show(type: 'success' | 'warning' | 'danger', message: string) {
    console.debug('FlashService.show', type, message);
    const newMessage: FlashMessage = { type, message };
    this.messagesSignal.update(msgs => [...msgs, newMessage]);
  }

  clear() {
    this.messagesSignal.set([]);
  }

  remove(message: FlashMessage) {
    console.debug('FlashService.remove', message);
    this.messagesSignal.update(msgs => msgs.filter(m => m !== message));
  }

  handleResponse(body: any) {
    if (body && body.flash) {
      Object.entries(body.flash).forEach(([type, message]) => {
        this.show(type as 'success' | 'danger', message as string);
      });
    }
  }
}
