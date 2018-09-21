import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import { ErrorMessage, Message} from './message.interface';


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
      action: null,
      denyAction: null,
      acceptText: null,
      denyText: null
    };
    this.Stream$.next(message);
  }

  public stopLoading(): void {
    this.Stream$.next();
  }

  // public displayError(error: ErrorCode, action: () => void ): void {
  // console.log(ErrorMessage[error]);
  // const message: Message  = {
  //   text: ErrorMessage[error],
  //   loading: false,
  //   action: action,
  //   acceptText: 'Retry'
  // };
  //   this.Stream$.next(message);
  // }

  show(messageText: string) {
    const message: Message = {
      text: messageText,
      loading: false,
      action: () => {},
      denyAction: () => {},
      acceptText: null,
      denyText: null,
    };

    this.Stream$.next(message);
  }
}
