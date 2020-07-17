import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { ManagePersonsComponent } from './views/manage-persons/manage-persons.component';

const routes: Routes = [

  // { path: 'acessar', component: AcessarComponent },
  // { path: 'redirect', component: AcessarComponent },
  // { path: 'index', component: AcessarComponent },
  // { path: 'index.html', component: AcessarComponent },

  {
    path: '',
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'managePersons', component: ManagePersonsComponent  },
      // { path: '**', redirectTo: 'error/404' },
      // { path: '**', redirectTo: 'error/403', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
