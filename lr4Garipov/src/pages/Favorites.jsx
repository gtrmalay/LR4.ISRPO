import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Импортируем Link для навигации
import PokemonCard from "../components/PokemonCard";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((pokemon) => pokemon.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="favorites-page">
      <h1>Избранные покемоны</h1>

      {/* Кнопка для перехода на главную страницу с тем же стилем */}
      <Link to="/" className="favorites-link back-to-home">
        Назад на главную
      </Link>

      {favorites.length === 0 ? (
        <p>Вы ещё не добавили покемонов в избранное.</p>
      ) : (
        <div className="pokemon-grid">
          {favorites.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <PokemonCard pokemon={pokemon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
