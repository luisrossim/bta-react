export interface User {
    id: number;
    nome: string;
    email: string;
    telefone: string;
    role: object;
    atualizadoEm: Date;
    criadoEm: Date;
}