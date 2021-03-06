import React, { useState, useEffect, ChangeEvent } from 'react'
import { PokeItem } from '../PokeItem/PokeItem'
import './style.css'

interface IPokemonList {
  url: string;
}

interface ITypeName {
  type: {
    name: string;
  }
}

interface IAbilitiesName {
  ability: {
    name: string;
  }
}

interface IStatus {
  base_stat: number;
  stat: {
    name: string;
  }
}

interface ITypesArray extends Array<ITypeName> { }
interface IHabilitiesArray extends Array<IAbilitiesName> { }
interface IStatusArray extends Array<IStatus> { }

interface IPokemon {
  name: string;
  id: number;
  types: ITypesArray;
  abilities: IHabilitiesArray;
  height: number;
  stats: IStatusArray;
}

export const PokeList = () => {

  const [pokeList, setPokelist] = useState<IPokemon[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }

  async function gatherPokemonData(): Promise<any> {
    const typeInfo = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    const typeInfoResponse = await typeInfo.json();
    const pokemon = typeInfoResponse.results.map(async (pokemon: IPokemonList) => {
      const result = await fetch(pokemon.url);
      return result.json();
    });

    return Promise.all(pokemon);
  }

  useEffect(() => {
    gatherPokemonData().then((response: any) => {
      setPokelist(response);
    });
  }, []);

  return (
    <div className="container">
      <h1>Pokedex</h1>
      <input
        id="searchInput"
        type="text"
        placeholder="Encontre um Pokémon"
        value={searchTerm}
        onChange={handleChange}
        autoComplete="off"
      />
      <ul className="pokedex">
        {pokeList.map((pokemon: IPokemon) => {
          
          const {id, abilities, types, name, height, stats} = pokemon

          if (!name.includes(searchTerm)) {
            return null;
          }

          return (
            <PokeItem
              key={id}
              abilities={abilities.map(hability => hability.ability.name)}
              id={id} name={name}
              types={types.map(poke => poke.type.name)}
              height={height}
              stats={stats}
            />
          )
        })}
      </ul>
    </div>
  )
}
