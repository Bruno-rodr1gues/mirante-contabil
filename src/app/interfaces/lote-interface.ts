export interface LoteInterface {
  id: number;
  nome: string;
  valor: string;
  quantLancamentos: number;
  usuarioRegistro: string;
  usuarioAprovacao: string;
  situacaoLote: string;
  dataHoraSituacaoLote: Date;
}
