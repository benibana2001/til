export interface IProduct {
    id: number
    name: string
    description: string
    price: number
}

export const products: IProduct[] = [
    {
        description:
        "猫の美味しい美味しいおやつです。",
        id: 1,
        name: "スーパーカリカリ",
        price: 8
    },
    {
        description: "自動で砂を入れ替えるトイレです。",
        id: 2,
        name: "自動砂交換式便所",
        price: 12
    },
    {
        description: "病みつきになってしまうマタタビです。",
        id: 3,
        name: "ラリホーマタタビ",
        price: 12
    },
    {
        description: "電熱式ヒータの組込まれたクッションです。",
        id: 4,
        name: "地上の天使に供された崇高で可憐で優雅な唯一無二にして絶体絶命なる安息の地",
        price: 12
    }
]