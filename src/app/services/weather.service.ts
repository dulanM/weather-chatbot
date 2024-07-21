import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebsocketService } from './websocket.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private _weatherDataSubject = new Subject<any>();
  private _erorrSubject = new Subject<string>();
  constructor(private authService: AuthService, private wsService: WebsocketService) {
    const token = this.authService.getToken();
    this.wsService.connect(`ws://localhost:3000?token=${token}`);

    this.wsService.onMessage((data) => {
      this._weatherDataSubject.next(data);
    });

    this.wsService.onError((err) => {
      this._erorrSubject.next(err);
    });

   }

  getWeather(message: string) {
    this.wsService.sendMessage(message);
  }

  getWeatherData(): Observable<any> {
    return this._weatherDataSubject.asObservable();
  }

  getError(): Observable<string> {
    return this._erorrSubject.asObservable();
  }
  closeSocket() {
    this.wsService.closeSocket();
  }
}
