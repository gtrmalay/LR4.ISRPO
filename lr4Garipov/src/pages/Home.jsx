import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import "./Home.css";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPokemons = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=50");
      const pokemonList = response.data.results;

      const pokemonDetails = await Promise.all(
        pokemonList.map((pokemon) => axios.get(pokemon.url))
      );

      setPokemons(pokemonDetails.map((res) => res.data));
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="home">
      <h1>Список покемонов</h1>

      {/* Кнопка перехода в избранное */}
      <Link to="/favorites" className="favorites-link">
        Перейти в избранное
      </Link>

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="pokemon-grid">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
