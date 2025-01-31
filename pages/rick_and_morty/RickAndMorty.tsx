import { getRickAndMortyCharacters } from "@/utils/actions";
import React from "react";

function RickAndMorty() {
  const { data, loading, error } = getRickAndMortyCharacters();

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="font-bold text-2xl mb-5">
        Rick and Morty All Characters
      </div>
      <div className="flex gap-10 flex-wrap">
        {Array.isArray(data) ? (
          data.map((character) => {
            return (
              <div key={character.id}>
                <img src={character.image} alt="image" />
                <div className="flex justify-center gap-5">
                  <p>{character.name}</p>
                  <p>{character.status}</p>
                </div>
              </div>
            );
          })
        ) : (
          <>qwe</>
        )}
      </div>
    </>
  );
}

export default RickAndMorty;
