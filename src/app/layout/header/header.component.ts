import { Component, inject, OnInit } from '@angular/core';
import { BreadcrumbComponent } from 'xng-breadcrumb';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  imports: [BreadcrumbComponent],
  selector: 'app-header',
  styleUrl: './header.component.css',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  title = '';

  private router = inject(Router);

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
    .subscribe(() => {
      this.title = this.getRouterTitle();
    });
  }

  private getRouterTitle() {
    let route = this.router.routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.title ?? '';
  }
}
