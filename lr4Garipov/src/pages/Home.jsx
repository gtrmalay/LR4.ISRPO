import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PokemonCard from "../components/PokemonCard";
import "./Home.css";

function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  // Фильтрация покемонов по запросу поиска
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home">
      <h1>Список покемонов</h1>

      {/* Кнопка перехода в избранное */}
      <Link to="/favorites" className="favorites-link">
        Перейти в избранное
      </Link>

      {/* Поле поиска */}
      <input
        type="text"
        className="search-bar"
        placeholder="Поиск покемонов..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="pokemon-grid">
          {filteredPokemons.length === 0 ? (
            <p>Покемоны не найдены</p>
          ) : (
            filteredPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
