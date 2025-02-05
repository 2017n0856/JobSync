import { Response } from "src/types/response.type";
import { getCountryDataList } from 'countries-list';
import { GraphQLError } from 'graphql';

const isProduction = process.env.NODE_ENV === 'production';

export const formatError = (error: GraphQLError) => {
  const { message, path, extensions } = error;
  
  return {
    message: message || 'An unexpected error occurred',
    code: extensions?.code || 'INTERNAL_SERVER_ERROR',
    status: extensions?.status || 500,
    details: !isProduction ? extensions?.exception || null : null,
    path: path || null,
    timestamp: new Date().toISOString(),
  };
};

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