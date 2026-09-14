import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatInput, MatInputModule, MatLabel } from '@angular/material/input';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import {
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableComponent } from '../table-component/table.component';
import { LoteFilter } from '../../interfaces/lote-filter';
import { NgxMaskDirective } from 'ngx-mask';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatDatepickerToggle,
    MatIconModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatOption,
    MatSelect,
    MatInput,
    TableComponent,
    NgxMaskDirective,
  ],
  selector: 'app-outros-debitos',
  standalone: true,
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  styleUrl: './debito.component.css',
  templateUrl: './debito.component.html',
})
export class DebitoComponent implements OnInit {
  debitoFormFilter!: FormGroup;

  filtrosTabela?: LoteFilter;

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('pt-BR');
  }

  ngOnInit() {
    this.debitoFormFilter = new FormGroup({
      instituicaoResp: new FormControl(''),
      instituicao: new FormControl(''),
      inicioId: new FormControl(''),
      finalId: new FormControl(''),
      situacaoLote: new FormControl('todas'),
      valorLoteInicio: new FormControl(''),
      valorLoteFinal: new FormControl(''),
      dataEntrada: new FormControl<Date | null>(null),
      dataFinal: new FormControl<Date | null>(null),
    });
  }

  protected search(): void {
    const form = this.debitoFormFilter.getRawValue();

    this.filtrosTabela = {
      instituicaoResp: form.instituicaoResp || undefined,
      instituicao: form.instituicao || undefined,
      inicioId: form.inicioId ? Number(form.inicioId) : undefined,
      finalId: form.finalId ? Number(form.finalId) : undefined,
      valorLoteInicio: form.valorLoteInicio ? Number(form.valorLoteInicio) : undefined,
      valorLoteFinal: form.valorLoteFinal ? Number(form.valorLoteFinal) : undefined,
      situacaoLote: form.situacaoLote || undefined,
      dataEntrada: form.dataEntrada || undefined,
      dataFinal: form.dataFinal || undefined,
    };
  }
}
