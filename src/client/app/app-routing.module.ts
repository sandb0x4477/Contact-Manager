import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ContactEditComponent } from './contact-edit/contact-edit.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'contacts',
  pathMatch: 'full'
},
{
  path: 'contacts',
  component: ContactListComponent,
  canActivate: [AuthGuard]
},
{
  path: 'add',
  component: ContactAddComponent,
  canActivate: [AuthGuard]
},
{
  path: 'edit',
  component: ContactEditComponent,
  canActivate: [AuthGuard]
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: '**',
  redirectTo: 'contacts',
  canActivate: [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
