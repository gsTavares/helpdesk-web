export interface Chamado {
    id?: number,
    dataAbertura?: string,
    dataFechamento?: string,
    prioridade: string,
    status: string,
    titulo: string,
    observacoes: string,
    tecnico: any,
    cliente: any,
    nomeCliente: string,
    nomeTecnico: string 
}