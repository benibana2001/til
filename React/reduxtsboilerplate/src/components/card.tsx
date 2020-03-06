import React from 'react'
import { CardState } from '../types'

const Card: React.FunctionComponent<CardState> = props => {
    return (
        <article className='card'>
            <header className='card-header'>{props.id}</header>
            <div className='card=box'>
                <h2 className='card__text'>{props.text}</h2>
            </div>
        </article>
    )
}

export default Card 
