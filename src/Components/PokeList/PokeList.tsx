import React, { useState, useEffect } from 'react'
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
      <ul className="pokedex">
        {pokeList.map((pokemon: IPokemon) => {
          return (
            <PokeItem
              key={pokemon.id}
              abilities={pokemon.abilities.map(hability => hability.ability.name)}
              id={pokemon.id} name={pokemon.name}
              types={pokemon.types.map(poke => poke.type.name)}
              height={pokemon.height}
              stats={pokemon.stats}
            />
          )
        })}
      </ul>
    </div>
  )
}
