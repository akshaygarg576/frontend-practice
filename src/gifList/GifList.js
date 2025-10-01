import React from "react";

export const GifCard = ({ gif }) => {
  return (
    <img
      className="p-2 h-64 mx-auto"
      src={gif.images.fixed_width.url}
      alt={gif.images.title}
      loading="lazy"
    />
  );
};

export const GifList = ({ gifs }) => {
  return (
    <div className="grid grid-cols-4">
      {gifs.map((gif) => {
        return <GifCard key={gif.id} gif={gif} />;
      })}
    </div>
  );
};
