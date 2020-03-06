import * as React from 'react'
import { CardState, CardListState } from '../types'
import Card from './card'

type CardListProps = CardListState

const CardList: React.FunctionComponent<CardListProps> = props => {
    return (
        <div>
            {props.cards.map((card: CardState) => (
                <Card
                    key={card.id}
                    id={card.id}
                    text={card.text}
                />
            ))}
        </div>
    )
}

export default CardList
