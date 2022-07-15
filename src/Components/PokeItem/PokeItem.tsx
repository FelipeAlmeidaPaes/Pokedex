import React from 'react'
import './styles.css'

interface IPokeStats {
  base_stat: number;
  stat: {
    name: string;
  }
}

interface IPokeItemProps {
  name: string;
  id: number;
  types: string[];
  abilities: string[];
  height: number;
  stats: IPokeStats[]
}

export const PokeItem = (props: IPokeItemProps) => {

  const { types, name, id, abilities, height, stats } = props

  return (
    <li className={`card ${types[0]}`}>
      <div className="card-inner">
        <div className={`card-front ${types[0]}`}>
          <img className='card-image' src={`https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${id}.png`} alt={name} />
          <h2 className="card-title">{id}. {name}</h2>
          <p className="card-subtitle">{types.map(name => name).join(' | ')}</p>
        </div>

        <div className={`card-back ${types[0]}`}>
          <h2 className="card-title">{id}. {name}</h2>
          <p className="card-abilities">Habilidades: {abilities.map(hability => hability).join(' ,')}</p>
          <p className="card-height">Tamanho: {height}</p>
          <ul className="card-stats">
            {stats.map(stat => {
              return (
                <li
                  key={`${stat.stat.name}${stat.base_stat}`}
                  className={`stat ${stat.stat.name}`}
                >
                  {stat.stat.name}: {stat.base_stat}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </li>
  )
}
