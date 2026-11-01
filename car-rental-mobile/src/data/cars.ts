import { useEffect, useState } from 'react';

import { API_URL, apiGet } from '@/api';

export type Car = {
  id: number;
  name: string;
  category: string;
  pricePerDay: number;
  transmission: string;
  maxSpeed: number;
  rating: number;
  imageUrl: string;
};

export function carImage(car: Car) {
  return { uri: `${API_URL}${car.imageUrl}` };
}

export function useCars(params: { category?: string; search?: string } = {}) {
  const [result, setResult] = useState<{ query: string; cars: Car[]; error: string } | null>(null);

  const query = Object.entries(params)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value as string)}`)
    .join('&');

  useEffect(() => {
    let outdated = false;
    apiGet<Car[]>(`/cars${query && `?${query}`}`)
      .then((cars) => {
        if (!outdated) setResult({ query, cars, error: '' });
      })
      .catch((e: Error) => {
        if (!outdated) setResult({ query, cars: [], error: e.message });
      });
    return () => {
      outdated = true;
    };
  }, [query]);

  return {
    cars: result?.cars ?? [],
    loading: result?.query !== query,
    error: result?.error ?? '',
  };
}

export function useCar(id: number) {
  const [car, setCar] = useState<Car | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let outdated = false;
    apiGet<Car>(`/cars/${id}`)
      .then((data) => {
        if (!outdated) setCar(data);
      })
      .catch((e: Error) => {
        if (!outdated) setError(e.message);
      });
    return () => {
      outdated = true;
    };
  }, [id]);

  return { car, error };
}
