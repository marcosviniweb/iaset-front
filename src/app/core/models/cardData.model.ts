export interface CardData {
    name:string,
    matricula:string,
    cpf:string,
    birthDay:string,
    createdAt:string,
    photo?:string
    birthDate?:string
    user?:{name:string, id:number}
    userId?:number
}