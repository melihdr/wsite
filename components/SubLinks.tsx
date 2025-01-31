"use client";

import React from "react";

const sublinks = [
  "astro",
  "spacex",
  "book",
  "about",
  "rick and morty",
  "sudoku",
];

type SublinkProps = {
  onSublinkClick: (sublink: string) => void;
};

function SubLinks({ onSublinkClick }: SublinkProps) {
  return (
    <div>
      {sublinks.map((sublink) => {
        return (
          <div key={sublink}>
            <button
              className="hover:bg-[#1b263b] hover:text-[#e0e1dd] duration-50 p-[1px] tracking-wide"
              onClick={() => onSublinkClick(sublink)}
            >
              {sublink}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default SubLinks;
