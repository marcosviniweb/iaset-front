export interface UserData {
    id: number;
    name: string;
    matricula: string;
    cpf: string;
    rg: string;
    vinculo: string;
    lotacao: string;
    endereco: string;
    email: string;
    phone: string | File;
    photo: string;
    password: string;
    status: boolean;
    createdAt: string;
    updatedAt: string;
    birthDay:string,
    firstAccess:boolean;
}
export interface UpdateData {
    name: string;
    matricula: string;
    cpf: string;
    rg: string;
    vinculo: string;
    lotacao: string;
    endereco: string;
    email: string;
    phone: string;
    photo: File | null;
    birthDay:string,
    firstAccess:boolean;
}   

export interface userResponse {
    access_token:string
    user:UserData
}