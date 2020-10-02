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

  return (
    <li className={`card ${props.types[0]}`}>
      <div className="card-inner">
        <div className={`card-front ${props.types[0]}`}>
          <img className='card-image' src={`https://pokeres.bastionbot.org/images/pokemon/${props.id}.png`} alt={props.name} />
          <h2 className="card-title">{props.id}. {props.name}</h2>
          <p className="card-subtitle">{props.types.map(name => name).join(' | ')}</p>
        </div>

        <div className={`card-back ${props.types[0]}`}>
          <h2 className="card-title">{props.id}. {props.name}</h2>
          <p className="card-abilities">Habilidades: {props.abilities.map(hability => hability).join(' ,')}</p>
          <p className="card-height">Tamanho: {props.height}</p>
          <ul className="card-stats">
            {props.stats.map(stat => {
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
