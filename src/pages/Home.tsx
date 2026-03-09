import { useState } from "react";
import GeneralData from "../components/GeneralData/GeneralData.tsx";
import SearchForAPlace from "../components/SearchForAPlace/SearchForAPlace.tsx";
import { fetchCurrentWeather } from "../services/open-meteoService";
import type { GeocodingResult } from "../types/geocoding";
import type { CurrentWeather } from "../types/weather";
import AdditionalInformation from "../components/AdditionalInformation/AdditionalInformation.tsx";

export default function Home() {
  const [selectedPlace, setSelectedPlace] = useState<GeocodingResult | null>(
    null,
  );
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handlePlaceSelect(place: GeocodingResult): Promise<void> {
    setSelectedPlace(place);
    setLoading(true);
    setError(null);

    try {
      const weatherData = await fetchCurrentWeather(
        place.latitude,
        place.longitude,
      );

      setWeather(weatherData);
    } catch (err) {
      console.error("Error fetching weather data:", err);
      setError("Error fetching weather data. Try again.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SearchForAPlace onPlaceSelect={handlePlaceSelect} />
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <GeneralData
        selectedPlace={selectedPlace}
        weather={weather}
        loading={loading}
      />
      <AdditionalInformation
        selectedPlace={selectedPlace}
        weather={weather}
        loading={loading}
      />
    </div>
  );
}
