export interface OrderPaginated {
    id: string;
    numero: number;
    cancelada_em?: Date;
    criado_em: Date;
    cliente_id: number;
    cliente_nome: string;
    historico_id: string;
    etapa_id: number;
    etapa_descricao: string;
    historico_concluido_em?: Date;
    historico_atualizado_em: Date;
    historico_criado_em: Date;
    usuarios_atribuidos: { id: string; nome: string }[];
}
