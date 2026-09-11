import { Component } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup } from '@angular/material/card';

@Component({
  imports: [MatCard, MatCardHeader, MatCardTitleGroup, MatCardTitle, MatCardContent],
  selector: 'app-dashboard',
  styleUrl: './dashboard.component.css',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
