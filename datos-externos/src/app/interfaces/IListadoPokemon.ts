import { IPokemon } from "./IPokemon"

export interface IListadoPokemon{
    count: number
    next: string
    previous: string | null
    results: IPokemon[]
}