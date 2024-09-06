import { Routes } from '@angular/router';
import { LenderboardComponent } from './lenderboard/lenderboard.component';
import { HomeComponent } from './home/home.component';
import { MyLoansComponent } from './my-loans/my-loans.component';
import { MyBorrowsComponent } from './my-borrows/my-borrows.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'lenderboard',
    component: LenderboardComponent,
  },
  {
    path: 'my-loans',
    component: MyLoansComponent,
  },
  {
    path: 'my-borrows',
    component: MyBorrowsComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];
