"use client";

import Image from "next/image";
import React from "react";
import UseFetchNASAData from "@/utils/useFetchNASAData";
import { AiOutlineCopyright } from "react-icons/ai";

function Astronomy() {
  const { data, loading, error } = UseFetchNASAData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="font-bold mb-3 text-2xl">Astronomy Picture of the Day</h1>
      <h1 className="font-bold">{data?.title}</h1>
      <p>{data?.explanation}</p>
      {data?.media_type === "image" && (
        <Image src={data.url} alt="image" width={800} height={500} />
      )}
      <p>
        <AiOutlineCopyright className="inline" />
        {data?.copyright}
      </p>
    </div>
  );
}

export default Astronomy;
