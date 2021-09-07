import { weather } from "./axios";

export function getWeather (city, key = '1dfcfca76b0ac9628561c8f56983c024') {
  return weather ({
    params: {
      city,
      key
    }
  })
}