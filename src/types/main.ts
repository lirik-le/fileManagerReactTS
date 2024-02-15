type Item = {
    id: string,
    name: string,
    file?: {
        name: string,
        filepath: string
    },
    type: string,
}

export type Data = {
    id: string,
    name: string,
    children: Item[]
}