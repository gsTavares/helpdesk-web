export interface Chamado {
    id?: number,
    dataAbertura?: string,
    dataFechamento: string,
    prioridade: string,
    status: string,
    titulo: string,
    descricao: string,
    tecnico: any,
    cliente: any,
    nomeCliente: string,
    nomeTecnico: string 
}