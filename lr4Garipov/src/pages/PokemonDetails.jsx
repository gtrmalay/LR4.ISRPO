import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./PokemonDetails.css";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPokemonDetails = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      setPokemon(response.data);
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemonDetails();
  }, [id]);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (!pokemon) {
    return <p>Покемон не найден.</p>;
  }

  return (
    <div className="pokemon-details">
      <Link to="/" className="back-button">
        Назад
      </Link>
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <p>
        <strong>Тип:</strong>{" "}
        {pokemon.types.map((type) => type.type.name).join(", ")}
      </p>
      <p>
        <strong>Вес:</strong> {pokemon.weight} кг
      </p>
      <p>
        <strong>Рост:</strong> {pokemon.height} м
      </p>
    </div>
  );
}

export default PokemonDetails;