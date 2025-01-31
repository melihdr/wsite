"use client";

import React from "react";
import { getSpaceXRockets } from "@/utils/actions";

function SpaceX() {
  const { data, loading, error } = getSpaceXRockets();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {Array.isArray(data) ? (
        data.map((rocket, index) => {
          return (
            <div key={index} className="mb-4">
              <p className="font-bold">{rocket.rocket_name}</p>
              <p>{rocket.description}</p>
              <p>cost per launch: {rocket.cost_per_launch}$</p>
              <img src={rocket.flickr_images[0]} alt="rocket image" />
            </div>
          );
        })
      ) : (
        <div>No rocket data available</div>
      )}
    </div>
  );
}

export default SpaceX;
