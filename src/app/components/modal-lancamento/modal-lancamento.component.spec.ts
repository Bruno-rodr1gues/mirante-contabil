import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalLancamentoComponent } from './modal-lancamento.component';

describe('ModalLancamento', () => {
  let component: ModalLancamentoComponent;
  let fixture: ComponentFixture<ModalLancamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalLancamentoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalLancamentoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
