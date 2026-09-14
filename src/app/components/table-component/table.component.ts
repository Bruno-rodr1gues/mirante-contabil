import { AfterViewInit, Component, inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
  MatTableDataSource
} from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { LoteInterface } from '../../interfaces/lote-interface';
import { LoteFilter } from '../../interfaces/lote-filter';
import { MatDialog } from '@angular/material/dialog';
import { ModalLancamentoComponent } from '../modal-lancamento/modal-lancamento.component';
import { LancamentoService } from '../../services/lancamento.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

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
    DatePipe,
    MatPaginator,
    CurrencyPipe,
  ],
  standalone: true,
  selector: 'app-table-component',
  styleUrl: './table.component.css',
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit, OnChanges, AfterViewInit {
  protected dataTable = new MatTableDataSource<LoteInterface>([]);
  protected originalDataTable: LoteInterface[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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

  dialog = inject(MatDialog);

  lancamentoService = inject(LancamentoService);

  ngOnInit() {
    this.findAllLancamentos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filtros'] && this.filtros) {
      this.aplicarFiltro(this.filtros);
    }
  }

  ngAfterViewInit() {
    this.dataTable.paginator = this.paginator;
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
    const ids = this.dataTable.data.map((element) => element.id);

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
    this.dataTable.data = this.originalDataTable.filter((lote) => {
      // 1. Filtro por ID (Início e Fim)
      if (
        filtros.inicioId !== null &&
        filtros.inicioId !== undefined &&
        lote.id < filtros.inicioId
      ) {
        return false;
      }
      if (filtros.finalId !== null && filtros.finalId !== undefined && lote.id > filtros.finalId) {
        return false;
      }

      // 2. Filtro por Valor do Lote (Início e Fim)
      const valorNum = parseFloat(lote.valor);
      if (
        filtros.valorLoteInicio !== null &&
        filtros.valorLoteInicio !== undefined &&
        valorNum < filtros.valorLoteInicio
      ) {
        return false;
      }
      if (
        filtros.valorLoteFinal !== null &&
        filtros.valorLoteFinal !== undefined &&
        valorNum > filtros.valorLoteFinal
      ) {
        return false;
      }

      if (
        filtros.instituicaoResp &&
        !lote.instituicaoResp?.toLowerCase().includes(filtros.instituicaoResp.toLowerCase().trim())
      ) {
        return false;
      }
      if (
        filtros.instituicao &&
        !lote.instituicao?.toLowerCase().includes(filtros.instituicao.toLowerCase().trim())
      ) {
        return false;
      }

      const dataLote = new Date(lote.dataHoraSituacaoLote).getTime();

      if (filtros.dataEntrada) {
        const dataInicio = new Date(filtros.dataEntrada);
        dataInicio.setHours(0, 0, 0, 0);
        if (dataLote < dataInicio.getTime()) return false;
      }

      if (filtros.dataFinal) {
        const dataFim = new Date(filtros.dataFinal);
        dataFim.setHours(23, 59, 59, 999);
        if (dataLote > dataFim.getTime()) return false;
      }

      if (
        filtros.situacaoLote &&
        filtros.situacaoLote !== 'todas' &&
        lote.situacaoLote.toLowerCase() !== filtros.situacaoLote.toLowerCase()
      ) {
        return false;
      }

      return true;
    });
  }

  protected openDialog() {
    const dialogRef = this.dialog.open(ModalLancamentoComponent, {
      width: '110vh',
      maxWidth: '200vh',
      minWidth: '20vw',
      maxHeight: '90vh',
      minHeight: '40vh',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('fechou a modal');
    });
  }

  private findAllLancamentos() {
    this.lancamentoService.findAllLancamentos().subscribe({
      next: (value) => {
        value.forEach((item) => {
          item.dataHoraSituacaoLote = new Date(item.dataHoraSituacaoLote);
          console.log(item);
        });
        this.originalDataTable = value;
        this.dataTable.data = [...value];
      },
      error: (error) => {
        console.error('Erro:', error);
      },
    });
  }
}
