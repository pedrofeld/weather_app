import { useState, useEffect } from "react";
import {
  searchPlaces,
  formatPlaceDescription,
} from "../../services/geocodingService";
import type { GeocodingResult } from "../../types/geocoding";
import {
  Container,
  Title,
  SearchContainer,
  SearchInput,
  ResultsDropdown,
  ResultItem,
  PlaceName,
  PlaceLocation,
  PlaceCoordinates,
  NoResultMessage,
} from "./SearchForAPlace.styles";

interface SearchForAPlaceProps {
  onPlaceSelect: (place: GeocodingResult) => void;
}

export default function SearchForAPlace({
  onPlaceSelect,
}: SearchForAPlaceProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        try {
          const results = await searchPlaces(searchQuery);
          setSearchResults(results);
          setShowResults(true);
        } catch (err) {
          console.error("Error searching places:", err);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  function handlePlaceSelect(place: GeocodingResult) {
    setSearchQuery(formatPlaceDescription(place));
    setShowResults(false);
    onPlaceSelect(place);
  }

  return (
    <Container>
      <Title>How's the sky looking today?</Title>

      <SearchContainer>
        <SearchInput
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a place..."
          onFocus={() => setShowResults(searchResults.length > 0)}
        />

        {!showResults && searchResults.length === 0 && (
          <NoResultMessage>No search result found!</NoResultMessage>
        )}

        {showResults && searchResults.length > 0 && (
          <ResultsDropdown>
            {searchResults.map((place) => (
              <ResultItem
                key={place.id}
                onClick={() => handlePlaceSelect(place)}
              >
                <PlaceName>{place.name}</PlaceName>
                <PlaceLocation>
                  {place.admin1 && `${place.admin1}, `}
                  {place.country}
                </PlaceLocation>
                <PlaceCoordinates>
                  Lat: {place.latitude.toFixed(4)}, Lon:{" "}
                  {place.longitude.toFixed(4)}
                </PlaceCoordinates>
              </ResultItem>
            ))}
          </ResultsDropdown>
        )}
      </SearchContainer>
    </Container>
  );
}
