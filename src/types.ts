/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PerfilUtilizador = 'ADMIN' | 'GESTOR' | 'OPERADOR';

export interface Utilizador {
  id: number;
  nome: string;
  username: string;
  passwordHash: string; // client-side simulation
  perfil: PerfilUtilizador;
  email?: string;
}

export interface Especie {
  id: number;
  nome: string;
  descricao: string;
}

export type EstadoAnimal = 'ACTIVO' | 'QUARENTENA' | 'FALECIDO';
export type SexoAnimal = 'M' | 'F';

export interface Animal {
  id: number;
  nome: string;
  sexo: SexoAnimal;
  raca: string;
  dataNasc: string; // ISO date string YYYY-MM-DD
  peso: number; // in kg
  estado: EstadoAnimal;
  idEspecie: number;
  idPai: number | null;
  idMae: number | null;
}

export interface Nascimento {
  id: number;
  dataNasc: string;
  idMae: number;
  idPai: number;
  idCria: number;
  observacoes: string;
}

export interface Mortalidade {
  id: number;
  idAnimal: number;
  dataMorte: string;
  causa: string;
  observacoes: string;
}

export type TipoEventoSanitario = 'VACINA' | 'TRATAMENTO' | 'DOENCA';

export interface HistoricoSanitario {
  id: number;
  idAnimal: number;
  dataEvento: string;
  tipo: TipoEventoSanitario;
  descricao: string;
  veterinario: string;
}

export type TipoConteudoWeb = 'PAGINA' | 'NOTICIA' | 'SERVICO';

export interface ConteudoWeb {
  id: number;
  tipo: TipoConteudoWeb;
  titulo: string;
  corpo: string;
  imagemUrl: string;
  dataPub: string;
  publicado: boolean;
}

export interface EspecieWeb {
  id: number;
  idEspecie: number;
  descricaoPublica: string;
  imagemUrl: string;
  visivel: boolean;
  verSexo?: boolean;
  verPopulacao?: boolean;
  verQuarentena?: boolean;
  verPesoMedio?: boolean;
}

export interface MensagemWeb {
  id: number;
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
  dataRecebido: string;
  lida: boolean;
}

export interface ConsecutividadeAlerta {
  animalA: Animal;
  animalB: Animal;
  grau: number;
  relevancia: 'PROIBIDO_DIRECTO' | 'PROIBIDO_COLATERAL' | 'ALERTA_RECOMENDADO' | 'ALERTA_MODERADO' | 'SEGURO';
  descricao: string;
  ancestralComum?: string;
}
