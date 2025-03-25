export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
  sexo: 'Masculino' | 'Feminino' | 'Outro';
  estadoCivil: 'Solteiro' | 'Casado' | 'Divorciado' | 'Viúvo' | 'Outro';
  empregado: boolean;
  estudo: 'Fundamental' | 'Médio' | 'Superior' | 'Pós-Graduação' | 'Outro';
}
