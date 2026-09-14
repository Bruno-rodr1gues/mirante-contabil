export interface LoteInterface {
  instituicao: string;
  instituicaoResp: string;
  id: number;
  nome: string;
  valor: string;
  quantLancamentos: number;
  usuarioRegistro: string;
  usuarioAprovacao: string;
  situacaoLote: string;
  dataHoraSituacaoLote: Date;
}
