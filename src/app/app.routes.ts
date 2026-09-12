import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DebitoComponent } from './components/outros-debitos/debito.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    title: 'Início',
    data: {
      breadcrumb: {
        label: 'Início',
      },
    },
  },
  {
    path: 'debitos',
    component: DebitoComponent,
    title: 'Outros Créditos/Débitos',
    data: {
      breadcrumb: {
        label: 'Outros Créditos/Débitos',
      },
    },
  },
];
