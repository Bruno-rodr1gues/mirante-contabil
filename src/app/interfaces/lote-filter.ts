export interface LoteFilter {
  instituicaoResp?: string;
  inicioId?: number;
  finalId?: number;
  instituicao?: string;
  valorLoteInicio?: number;
  valorLoteFinal?: number;
  situacaoLote?: string;
  dataEntrada?: Date;
  dataFinal?: Date;
}
