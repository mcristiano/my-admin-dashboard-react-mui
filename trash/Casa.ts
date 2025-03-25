import { Endereco } from './Endereco';
import { Pessoa } from './Pessoa';

export interface Casa {
  id: string;
  endereco: Endereco;
  moradores: Pessoa[];
}
