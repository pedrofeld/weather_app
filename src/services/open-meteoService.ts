import { fetchWeatherApi } from "openmeteo";
import type {
  CurrentWeather,
  DailyForecast,
  HourlyForecast,
  WeatherData,
} from "../types/weather";

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast";

// ==================== FETCH FUNCTIONS ====================

/**
 * Fetch current weather data for a specific location
 */
export async function fetchCurrentWeather(
  latitude: number,
  longitude: number,
): Promise<CurrentWeather> {
  try {
    const params = {
      latitude,
      longitude,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "precipitation",
        "weather_code",
        "cloud_cover",
        "pressure_msl",
        "wind_speed_10m",
        "wind_direction_10m",
      ],
    };

    const responses = await fetchWeatherApi(WEATHER_API_URL, params);
    const response = responses[0];
    const current = response.current()!;

    return {
      temperature: current.variables(0)!.value(),
      humidity: current.variables(1)!.value(),
      apparentTemperature: current.variables(2)!.value(),
      isDay: current.variables(3)!.value(),
      precipitation: current.variables(4)!.value(),
      weatherCode: current.variables(5)!.value(),
      cloudCover: current.variables(6)!.value(),
      pressure: current.variables(7)!.value(),
      windSpeed: current.variables(8)!.value(),
      windDirection: current.variables(9)!.value(),
    };
  } catch (error) {
    console.error("Error fetching current weather:", error);
    throw new Error("Failed to fetch current weather data");
  }
}

/**
 * Fetch daily forecast data (7 days)
 */
export async function fetchDailyForecast(
  latitude: number,
  longitude: number,
  days: number = 7,
): Promise<DailyForecast[]> {
  try {
    const params = {
      latitude,
      longitude,
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "weather_code",
        "precipitation_sum",
        "precipitation_probability_max",
        "wind_speed_10m_max",
        "sunrise",
        "sunset",
      ],
      forecast_days: days,
    };

    const responses = await fetchWeatherApi(WEATHER_API_URL, params);
    const response = responses[0];
    const daily = response.daily()!;

    const dailyData: DailyForecast[] = [];
    const timeStart = Number(daily.time());
    const timeEnd = Number(daily.timeEnd());
    const interval = daily.interval();

    for (let time = timeStart; time < timeEnd; time += interval) {
      const index = (time - timeStart) / interval;

      dailyData.push({
        date: new Date(time * 1000),
        temperatureMax: daily.variables(0)!.valuesArray()![index],
        temperatureMin: daily.variables(1)!.valuesArray()![index],
        weatherCode: daily.variables(2)!.valuesArray()![index],
        precipitationSum: daily.variables(3)!.valuesArray()![index],
        precipitationProbability: daily.variables(4)!.valuesArray()![index],
        windSpeedMax: daily.variables(5)!.valuesArray()![index],
        sunrise: new Date(daily.variables(6)!.valuesArray()![index] * 1000),
        sunset: new Date(daily.variables(7)!.valuesArray()![index] * 1000),
      });
    }

    return dailyData;
  } catch (error) {
    console.error("Error fetching daily forecast:", error);
    throw new Error("Failed to fetch daily forecast data");
  }
}

/**
 * Fetch hourly forecast data (24 hours or custom)
 */
export async function fetchHourlyForecast(
  latitude: number,
  longitude: number,
  hours: number = 24,
): Promise<HourlyForecast[]> {
  try {
    const params = {
      latitude,
      longitude,
      hourly: [
        "temperature_2m",
        "weather_code",
        "wind_speed_10m",
        "relative_humidity_2m",
        "precipitation",
        "precipitation_probability",
      ],
      forecast_hours: hours,
    };

    const responses = await fetchWeatherApi(WEATHER_API_URL, params);
    const response = responses[0];
    const hourly = response.hourly()!;

    const hourlyData: HourlyForecast[] = [];
    const timeStart = Number(hourly.time());
    const timeEnd = Number(hourly.timeEnd());
    const interval = hourly.interval();

    for (let time = timeStart; time < timeEnd; time += interval) {
      const index = (time - timeStart) / interval;

      hourlyData.push({
        time: new Date(time * 1000),
        temperature: hourly.variables(0)!.valuesArray()![index],
        weatherCode: hourly.variables(1)!.valuesArray()![index],
        windSpeed: hourly.variables(2)!.valuesArray()![index],
        humidity: hourly.variables(3)!.valuesArray()![index],
        precipitation: hourly.variables(4)!.valuesArray()![index],
        precipitationProbability: hourly.variables(5)!.valuesArray()![index],
      });
    }

    return hourlyData;
  } catch (error) {
    console.error("Error fetching hourly forecast:", error);
    throw new Error("Failed to fetch hourly forecast data");
  }
}

/**
 * Fetch complete weather data (current + daily + hourly)
 */
export async function fetchCompleteWeatherData(
  latitude: number,
  longitude: number,
): Promise<WeatherData> {
  try {
    const [current, daily, hourly] = await Promise.all([
      fetchCurrentWeather(latitude, longitude),
      fetchDailyForecast(latitude, longitude, 7),
      fetchHourlyForecast(latitude, longitude, 24),
    ]);

    return {
      current,
      daily,
      hourly,
    };
  } catch (error) {
    console.error("Error fetching complete weather data:", error);
    throw new Error("Failed to fetch complete weather data");
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get weather description from WMO weather code
 * Source: https://open-meteo.com/en/docs
 */
export function getWeatherDescription(code: number): string {
  const weatherCodes: Record<number, string> = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return weatherCodes[code] || "Unknown";
}

/**
 * Get weather icon based on WMO weather code
 */
export function getWeatherIcon(code: number, isDay: boolean = true): string {
  if (code === 0 || code === 1) return isDay ? "☀️" : "🌙";
  if (code === 2) return isDay ? "⛅" : "☁️";
  if (code === 3) return "☁️";
  if (code === 45 || code === 48) return "🌫️";
  if (code >= 51 && code <= 57) return "🌧️";
  if (code >= 61 && code <= 67) return "🌧️";
  if (code >= 71 && code <= 77) return "❄️";
  if (code >= 80 && code <= 82) return "🌦️";
  if (code >= 85 && code <= 86) return "🌨️";
  if (code >= 95 && code <= 99) return "⛈️";

  return "🌡️";
}
