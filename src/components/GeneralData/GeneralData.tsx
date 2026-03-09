import type { GeocodingResult } from "../../types/geocoding";
import type { CurrentWeather } from "../../types/weather";
import { formatPlaceDescription } from "../../services/geocodingService";
import { WeatherCard, WeatherTitle, Temperature } from "./GeneralData.styles";

interface GeneralDataProps {
  selectedPlace: GeocodingResult | null;
  weather: CurrentWeather | null;
  loading?: boolean;
}

export default function GeneralData({
  selectedPlace,
  weather,
  loading = false,
}: GeneralDataProps) {
  if (loading || !selectedPlace || !weather) {
    return null;
  }

  return (
    <WeatherCard>
      <WeatherTitle>{formatPlaceDescription(selectedPlace)}</WeatherTitle>
      <Temperature>{weather.temperature.toFixed(1)}°C</Temperature>
    </WeatherCard>
  );
}
