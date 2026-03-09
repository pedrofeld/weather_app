export interface CurrentWeather {
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  apparentTemperature: number;
  isDay: number;
  precipitation: number;
  cloudCover: number;
  pressure: number;
  windDirection: number;
}

export interface DailyForecast {
  date: Date;
  temperatureMax: number;
  temperatureMin: number;
  weatherCode: number;
  precipitationSum: number;
  precipitationProbability: number;
  windSpeedMax: number;
  sunrise: Date;
  sunset: Date;
}

export interface HourlyForecast {
  time: Date;
  temperature: number;
  weatherCode: number;
  windSpeed: number;
  humidity: number;
  precipitation: number;
  precipitationProbability: number;
}

export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
}
