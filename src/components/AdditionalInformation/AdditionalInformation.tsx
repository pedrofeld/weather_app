import type { GeocodingResult } from "../../types/geocoding";
import type { CurrentWeather } from "../../types/weather";
import { Container, WeatherDetailItem } from "./AdditionalInformation.styles";

interface AdditionalInformationProps {
  selectedPlace: GeocodingResult | null;
  weather: CurrentWeather | null;
  loading?: boolean;
}

export default function AdditionalInformation({
  selectedPlace,
  weather,
  loading = false,
}: AdditionalInformationProps) {
  if (loading || !selectedPlace || !weather) {
    return null;
  }

  return (
    <Container>
      <WeatherDetailItem>
        <strong>Feels Like:</strong> {weather.apparentTemperature.toFixed(0)}°
      </WeatherDetailItem>
      <WeatherDetailItem>
        <strong>Humidity:</strong> {weather.humidity.toFixed(0)}%
      </WeatherDetailItem>
      <WeatherDetailItem>
        <strong>Wind:</strong> {weather.windSpeed.toFixed(1)} km/h
      </WeatherDetailItem>
      <WeatherDetailItem>
        <strong>Precipitation:</strong> {weather.precipitation.toFixed(0)}
        in
      </WeatherDetailItem>
    </Container>
  );
}
