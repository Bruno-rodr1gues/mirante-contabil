import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoteInterface } from '../interfaces/lote-interface';

@Injectable({
  providedIn: 'root',
})
export class LancamentoService {
  constructor(private http: HttpClient) {}

  findAllLancamentos() {
    return this.http.get<LoteInterface[]>('http://localhost:3000/lancamentos');
  }

  saveLancamento(payload: any) {
    return this.http.post('http://localhost:3000/lancamentoSesh', payload);
  }
}
