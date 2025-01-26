import { Response } from "src/types/response.type";
import { getCountryDataList } from 'countries-list'

export function getCurrencyFromCountry(country: string): string {
  const countries = getCountryDataList();
  const countryData = countries.find(
    (c) =>{ 
      return c.name.toLowerCase() === country.toLowerCase()}
  );
  if (!countryData || !countryData.currency) {
    throw new Error(`Currency not found for country: ${country}`);
  }
  return countryData.currency[0].toUpperCase();
}

export function sendResponse<T>(data: T, message: string, status?: boolean): Response<T> {
    return { status, message, data };
  }