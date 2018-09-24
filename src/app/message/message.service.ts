import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { Message } from './message.interface';


@Injectable({
  providedIn: 'root'
})

export class MessageService {
  Stream$: Subject<Message> = new Subject<Message>();
  constructor() { }

  public startLoading(): void {
    const message: Message  = {
      text: 'loading...',
      loading: true,
    };
    this.Stream$.next(message);
  }

  public stopLoading(): void {
    this.Stream$.next();
  }

  show(messageText: string) {
    const message: Message = {
      text: messageText
    };

    this.Stream$.next(message);
  }
}
