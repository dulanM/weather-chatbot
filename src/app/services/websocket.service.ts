import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private messageSubject = new Subject<any>();
  private errorSubject = new Subject<any>();
  constructor() { }

  connect(url: string) {
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log('WebSocket connection established');
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    this.socket.onerror = (event) => {
      console.error('WebSocket error:', event);
      this.errorSubject.next('WebSocket error occured');
    };

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.error) {
        this.errorSubject.next(message.error);
      } else {
        this.messageSubject.next(message);
      }
    };
  }

  sendMessage(message: string): void {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(message);
    } else {
      console.error('WebSocket is not open. Ready state is:', this.socket.readyState);
      this.errorSubject.next('WebSocket is not open!');
    }
  }

  onMessage(callback: (data: any) => void): void {
    this.messageSubject.subscribe(callback);
  }

  onError(callback: (error: any) => void): void {
    this.errorSubject.subscribe(callback);
  }

  closeSocket(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
