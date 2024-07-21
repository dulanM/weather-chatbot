import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherDataComponent } from "../weather-data/weather-data.component";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../services/weather.service';
import { WeatherData } from '../models/weatherData.model';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [WeatherDataComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent implements OnInit, OnDestroy {
  location: FormControl = new FormControl('');
  weatherdata: WeatherData[] = [];
  errorMessage: string = '';
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherService.getWeatherData().subscribe({
      next: (res) => {
        this.weatherdata = res;
        this.errorMessage = '';
      },
      error: (err) => {
        this.weatherdata = [];
        this.errorMessage = err.message;
      }
    });

    this.weatherService.getError().subscribe((err) => {
      this.weatherdata = [];
      this.errorMessage = err;
    });
  }

  getWeatherData() {
    this.weatherService.getWeather(this.location.value);
  }

  ngOnDestroy(): void {
      this.weatherService.closeSocket();
  }
}
