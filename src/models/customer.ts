export interface Customer {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    endereco: object;
    isAtivo: boolean;
    atualizadoEm: Date;
    criadoEm: Date;
}