import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { LoteInterface } from '../../interfaces/lote-interface';
import { LoteFilter } from '../../interfaces/lote-filter';

@Component({
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatCheckbox,
  ],
  selector: 'app-table-component',
  styleUrl: './table.component.css',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, OnChanges {
  protected dataTable: LoteInterface[] = [];
  protected originalDataTable: LoteInterface[] = [];

  displayedColumns: string[] = [
    'id',
    'nome',
    'valor',
    'quantLancamentos',
    'usuarioRegistro',
    'usuarioAprovacao',
    'situacaoLote',
    'dataHoraSituacaoLote',
  ];

  listIds: Array<number | undefined> = [];

  idSelected?: number | undefined;

  @Input() filtros?: LoteFilter;

  ngOnInit() {
    this.originalDataTable = [
      {
        id: 1,
        nome: 'teste',
        valor: '1000',
        quantLancamentos: 1,
        usuarioRegistro: 'testando novamente',
        usuarioAprovacao: 'Henrique teste',
        situacaoLote: 'Aberto',
        dataHoraSituacaoLote: new Date(),
      },
      {
        id: 2,
        nome: 'teste 2',
        valor: '5000',
        quantLancamentos: 3,
        usuarioRegistro: 'João',
        usuarioAprovacao: 'Maria',
        situacaoLote: 'Enviado',
        dataHoraSituacaoLote: new Date(),
      },
      {
        id: 3,
        nome: 'teste 3',
        valor: '15000',
        quantLancamentos: 5,
        usuarioRegistro: 'Carlos',
        usuarioAprovacao: 'Henrique',
        situacaoLote: 'Confirmado',
        dataHoraSituacaoLote: new Date(),
      },
    ];

    this.dataTable = [...this.originalDataTable];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filtros'] && this.filtros) {
      this.aplicarFiltro(this.filtros);
    }
  }

  protected selectItem(itemId?: number): void {
    if (itemId === undefined) {
      return;
    }

    const index = this.listIds.indexOf(itemId);

    if (index >= 0) {
      this.listIds.splice(index, 1);
    } else {
      this.listIds.push(itemId);
    }
  }

  protected isSelected(itemId: number) {
    return this.listIds.includes(itemId);
  }

  protected selectAll() {
    const ids = this.dataTable.map((element) => element.id);

    if (this.listIds.length === ids.length) {
      this.listIds = [];
    } else {
      this.listIds = [...ids];
    }
  }

  get checkItemSelected() {
    if (this.listIds.length > 1 || this.listIds.length === 0) {
      return true;
    } else {
      this.idSelected = this.listIds[0];
      return false;
    }
  }

  protected aplicarFiltro(filtros: LoteFilter): void {
    this.dataTable = this.originalDataTable.filter((lote) => {
      if (filtros.inicioId !== undefined && lote.id < filtros.inicioId) {
        return false;
      }

      if (filtros.finalId !== undefined && lote.id > filtros.finalId) {
        return false;
      }

      if (filtros.valorLoteInicio !== undefined && Number(lote.valor) < filtros.valorLoteInicio) {
        return false;
      }

      if (filtros.valorLoteFinal !== undefined && Number(lote.valor) > filtros.valorLoteFinal) {
        return false;
      }

      return !(
        filtros.situacaoLote &&
        filtros.situacaoLote !== 'todas' &&
        lote.situacaoLote.toLowerCase() !== filtros.situacaoLote.toLowerCase()
      );
    });
  }
}
