import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { WeatherData } from '../models/weatherData.model';

@Component({
  selector: 'app-weather-data',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './weather-data.component.html',
  styleUrl: './weather-data.component.scss'
})
export class WeatherDataComponent {
  @Input() weatherDetails: any= {};
}
