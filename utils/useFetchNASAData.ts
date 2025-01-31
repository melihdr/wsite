"use client";

import axios from "axios";
import { useState, useEffect } from "react";

type NASAData = {
  title: string;
  explanation: string;
  url: string;
  date: string;
  media_type: string;
  service_version_string: string;
  [key: string]: any;
  copyright: string;
};

type UseFetchNASAData = {
  data: NASAData | null;
  loading: boolean;
  error: string | null;
};

const UseFetchNASAData = (): UseFetchNASAData => {
  const [data, setData] = useState<NASAData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
        const response = await axios.get<NASAData>(url);
        setData(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.error?.message || err.message || "Unknown Error"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default UseFetchNASAData;
