import phoneInterface from "./phoneInterface"

export default interface contactInterface {
    id?: number
    nome: string
    idade: number
    numeros: phoneInterface[]
}