"use client";

import React, { useState } from "react";
import SubLinks from "@/components/SubLinks";
import Astronomy from "@/pages/astronomy/Astronomy";
import ProfileImage from "@/components/ProfileImage";
import About from "@/pages/about/About";
import Book from "@/pages/book/Book";
import { Separator } from "@radix-ui/react-separator";
import SpaceX from "@/pages/spacex/SpaceX";
import Navbar from "@/components/Navbar";
import RickAndMorty from "@/pages/rick_and_morty/RickAndMorty";
import Sudoku from "@/pages/sudoku/Sudoku";
import SudokuClass from "@/pages/sudoku/SudokuClass";

function HomePage() {
  const [activeSublink, setActiveSublink] = useState<string | undefined>();

  const handleSublinkClick = (sublink: string) => {
    setActiveSublink(sublink);
  };

  return (
    <main className="flex gap-4 py-8 ">
      <div className="w-[16%] ">
        <ProfileImage />
        <p className="font-medium">me, 2024</p>
        <hr className="border-gray-600 mb-3"></hr>
        <SubLinks onSublinkClick={handleSublinkClick} />
      </div>
      <div className="w-[84%]">
        <Navbar />
        {activeSublink ? activeSublink === "astro" && <Astronomy /> : null}
        {activeSublink ? activeSublink === "about" && <About /> : null}
        {activeSublink ? activeSublink === "book" && <Book /> : null}
        {activeSublink ? activeSublink === "spacex" && <SpaceX /> : null}
        {activeSublink
          ? activeSublink === "rick and morty" && <RickAndMorty />
          : null}
        {activeSublink ? activeSublink === "sudoku" && <SudokuClass /> : null}
      </div>
    </main>
  );
}

export default HomePage;
