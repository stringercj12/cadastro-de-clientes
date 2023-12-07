export interface Cliente {
  id: number;
  nomeCliente: string;
  cpf: string;
  dataNascimento: string;
  rendaMensal: number;
  email: string;
  dataCadastro: string;
  selecionado?: boolean;
}
