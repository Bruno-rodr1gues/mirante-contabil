import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
  {
    title: 'Dashboard  Apresentativo',
    path: 'dashboard',
    component: DashboardComponent,
    data: { title: 'Dashboard' }
  },
];
