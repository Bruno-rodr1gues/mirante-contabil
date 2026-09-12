import { Component, OnInit } from '@angular/core';
import { SidebarNode } from '../../interfaces/sidebar-interface';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  imports: [RouterLinkActive, RouterLink],
  selector: 'app-sidebar',
  standalone: true,
  styleUrl: './sidebar.component.css',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  sidebarList: SidebarNode[] | undefined;

  ngOnInit() {
    this.sidebarList = [
      {
        id: 1,
        name: 'Início',
        icon: 'home',
        path: '',
      },
      {
        id: 2,
        name: 'Creditos',
        icon: 'local_atm',
        path: 'debitos',
      },
    ];
  }
}
