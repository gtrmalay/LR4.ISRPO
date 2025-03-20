import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./PokemonCard.css"; 

function PokemonCard({ pokemon }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.id === pokemon.id));
  }, [pokemon.id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (isFavorite) {
      favorites = favorites.filter((fav) => fav.id !== pokemon.id);
    } else {
      favorites.push(pokemon);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="pokemon-card">
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <h2>{pokemon.name}</h2>
      <p>
        <strong>Тип:</strong>{" "}
        {pokemon.types.map((type) => type.type.name).join(", ")}
      </p>
      <Link to={`/details/${pokemon.id}`} className="details-link">
        Подробнее
      </Link>
      <button className="favorite-button" onClick={toggleFavorite}>
        {isFavorite ? "Удалить из избранного" : "Добавить в избранное"}
      </button>
    </div>
  );
}

export default PokemonCard;
