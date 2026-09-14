import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatError, MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDivider } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatRow,
  MatRowDef,
  MatTableModule,
} from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { LancamentoService } from '../../services/lancamento.service';
import { NgxMaskDirective } from 'ngx-mask';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatSuffix,
    MatIconButton,
    MatIcon,
    MatOption,
    MatCheckbox,
    MatDivider,
    MatCardSubtitle,
    MatSelect,
    ReactiveFormsModule,
    MatTableModule,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatRow,
    MatRowDef,
    MatError,
    DatePipe,
    NgxMaskDirective,
    MatSnackBarModule,
  ],
  selector: 'app-modal-lancamento',
  standalone: true,
  styleUrl: './modal-lancamento.component.css',
  templateUrl: './modal-lancamento.component.html',
})
export class ModalLancamentoComponent implements OnInit {
  dialogRef = inject(MatDialogRef<ModalLancamentoComponent>);
  data = inject(MAT_DIALOG_DATA);

  lancamentoForm!: FormGroup;

  formBuilder = inject(FormBuilder);

  displayedColumns: string[] = ['select', 'nome', 'descricao', 'dataInclusao', 'usuarioId'];

  dataSource: AbstractControl[] = [];

  selectedDocumentIndex: number | null = null;

  protected lancamentoService = inject(LancamentoService);

  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.lancamentoForm = this.formBuilder.group({
      contaCorrenteSesh: new FormGroup({
        contaCorrente: new FormControl('', [Validators.required]),
        valor: new FormControl('', [Validators.required]),
        historico: new FormControl('manual', [Validators.required]),
        estorno: new FormControl(false),
        documento: new FormControl('', [Validators.required]),
        descricao: new FormControl(''),
        situacao: new FormControl({ value: 'Pendente', disabled: true }, [Validators.required]),
      }),

      documentoCscSesh: new FormGroup({
        pa: new FormControl('cooperativa', [Validators.required]),
        idEvento: new FormControl('', [Validators.required]),
        complementoHistorico: new FormControl('', [Validators.required]),
        situacao: new FormControl({ value: 'Aguardando Processamento CCO', disabled: true }, [
          Validators.required,
        ]),
        idDocCSC: new FormControl('', [Validators.required]),
      }),

      anexos: this.formBuilder.array([]),
    });
  }

  get anexosFormArray(): FormArray {
    return this.lancamentoForm.get('anexos') as FormArray;
  }

  dialogClose(): void {
    this.dialogRef.close();
  }

  protected findCurrentAccount() {}

  protected findEvent() {}

  protected viewDocument() {}

  putDocument(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const arquivo = input.files[0];

    console.log(arquivo);

    const newAnexo = this.formBuilder.group({
      nome: new FormControl(arquivo.name, [Validators.required]),
      descricao: new FormControl(arquivo.name, [Validators.required]),
      dataInclusao: new FormControl(new Date(), [Validators.required]),
      usuarioId: new FormControl(1, [Validators.required]),
      arquivo: new FormControl(arquivo, [Validators.required]),
    });

    this.anexosFormArray.push(newAnexo);
    this.updateDataSource();

    input.value = '';
  }

  private updateDataSource() {
    this.dataSource = [...this.anexosFormArray.controls];
  }

  selectDocument(index: number): void {
    this.selectedDocumentIndex = this.selectedDocumentIndex === index ? null : index;
  }

  deleteDocument(): void {
    if (this.selectedDocumentIndex === null) {
      return;
    }

    this.anexosFormArray.removeAt(this.selectedDocumentIndex);

    this.updateDataSource();

    this.selectedDocumentIndex = null;
  }

  protected onSubmit() {
    if (this.lancamentoForm.invalid) {
      this.lancamentoForm.markAsTouched();
      return;
    }

    const rawFormValue = this.lancamentoForm.getRawValue();

    const payload = {
      contaCorrente: rawFormValue.contaCorrenteSesh,
      documentoCsc: rawFormValue.documentoCscSesh,
      anexos: rawFormValue.anexos.map((anexo: any) => ({
        nome: anexo.nome,
        descricao: anexo.descricao,
        dataInclusao: anexo.dataInclusao,
        usuarioId: anexo.usuarioId,
        arquivo: anexo.arquivo,
      })),
    };

    console.log('Payload a ser enviado:', payload);

    this.lancamentoService.saveLancamento(payload).subscribe((reponse) => {
      if (reponse) {
        console.log(reponse);
        this.dialogRef.close();
        this.showAlert();
      }
    });
  }

  showAlert() {
    this.snackBar.open('Cadastro realizado com sucesso!', 'Close', {
      duration: 3000, // Closes after 3 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  protected selectItem() {

  }
}
