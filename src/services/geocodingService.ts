import type { GeocodingResponse, GeocodingResult } from "../types/geocoding";

const GEOCODING_API_URL = "https://geocoding-api.open-meteo.com/v1/search";

export async function searchPlaces(
  query: string,
  language: string = "pt",
  count: number = 10,
): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const params = new URLSearchParams({
      name: query.trim(),
      count: count.toString(),
      language,
      format: "json",
    });

    const response = await fetch(`${GEOCODING_API_URL}?${params}`);

    if (!response.ok) {
      throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data: GeocodingResponse = await response.json();

    return data.results || [];
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    throw error;
  }
}

export function formatPlaceDescription(place: GeocodingResult): string {
  const parts = [place.name];

  if (place.admin1) {
    parts.push(place.admin1);
  }

  if (place.country) {
    parts.push(place.country);
  }

  return parts.join(", ");
}
