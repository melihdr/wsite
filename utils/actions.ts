"use client";

import RickAndMorty from "@/pages/rick_and_morty/RickAndMorty";
import axios from "axios";
import { useState, useEffect } from "react";

type SpaceXShip = {
  ship_name: string;
  image: string;
  year_built: number;
  weight_kg: number;
};

type getSpaceXShips = {
  data: SpaceXShip | null;
  loading: boolean;
  error: string | null;
};

export const getSpaceXShips = (): getSpaceXShips => {
  const [data, setData] = useState<SpaceXShip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://api.spacexdata.com/v3/ships";
        const response = await axios.get(url);
        setData(response.data);
      } catch (error: any) {
        setError(
          error.response?.data?.message || error.message || "Unknown Error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export const getSpaceXRockets = (): getSpaceXShips => {
  const [data, setData] = useState<SpaceXShip | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://api.spacexdata.com/v3/rockets";
        const response = await axios.get(url);
        setData(response.data);
      } catch (error: any) {
        setError(
          error.response?.data?.message || error.message || "Unknown Error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

type RickAndMortyCharacter = {
  name: string;
  image: string;
  id: number;
  status: string;
};

type getRickAndMortyCharacters = {
  data: RickAndMortyCharacter | null;
  loading: boolean;
  error: string | null;
};

export const getRickAndMortyCharacters = (): getRickAndMortyCharacters => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const numbers = Array.from({ length: 825 }, (_, i) => i + 1).join(",");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://rickandmortyapi.com/api/character/${numbers}`;
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data);
      } catch (error: any) {
        setError(
          error.response?.data?.message || error.message || "Unknown Error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};
