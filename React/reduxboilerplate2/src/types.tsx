export type CardState = {
    id: number
    text: string
}

export type CardListState = {
    cards: CardState[]
}

export type PostsState = {
    items: PostState[]
}

export type PostState = {
    id: number,
    title: string,
    body: string
}