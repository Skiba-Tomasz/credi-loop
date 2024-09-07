import { Routes } from '@angular/router';
import { LenderboardComponent } from './lenderboard/lenderboard.component';
import { HomeComponent } from './home/home.component';
import { MyLoansComponent } from './my-loans/my-loans.component';
import { CrediScoreComponent } from './credi-score/credi-score.component';

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
    path: 'crediscore',
    component: CrediScoreComponent,
  },
  {
    path: 'my-loans',
    component: MyLoansComponent,
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
