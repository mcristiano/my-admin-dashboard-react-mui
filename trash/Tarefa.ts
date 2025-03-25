export interface Tarefa {
  id: number | string;
  cep: string;
  logradouro: string;
  dataCadastro: string; // Usaremos string para datas neste exemplo
  dataConclusao: string | null; // Pode ser nulo se a tarefa não estiver concluída
}
