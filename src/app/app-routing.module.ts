import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListClinicComponent } from './list-clinic/list-clinic.component';
import { CreateClinicComponent } from './create-clinic/create-clinic.component';
import { EditClinicComponent } from './edit-clinic/edit-clinic.component';
import { ViewClinicComponent } from './view-clinic/view-clinic.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'list-clinic', component: ListClinicComponent , canActivate: [AuthGuard]},
  { path: 'create-clinic', component: CreateClinicComponent, canActivate: [AuthGuard] },
  { path: 'edit-clinic', component: EditClinicComponent, canActivate: [AuthGuard] },
  { path: 'view-clinic', component: ViewClinicComponent, canActivate: [AuthGuard] }, 
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
