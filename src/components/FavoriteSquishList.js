import React from "react";
import SquishCard from "./SquishCard";

function FavoriteSquishList({ favoriteSquishes, squish, setFavoriteSquishes}) {
  const favoriteSquishCards = squish.filter(squish => favoriteSquishes.includes(squish.id));

  return (
    <div id="list-container">
      <div id="squish-list">
        {favoriteSquishCards.map(squish => (
          <SquishCard
            key={squish.id}
            name={squish.name}
            image={squish.image}
            bio={squish.bio}
            toggleFavorite={() => setFavoriteSquishes(prevFavorites => prevFavorites.filter(id => id !== squish.id))}
            squish={squish}
            favoriteSquishes={favoriteSquishes}

          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteSquishList;