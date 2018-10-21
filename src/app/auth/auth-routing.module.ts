import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

import { LoginComponent } from 'src/app/auth/login/login.component';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'login' , component: LoginComponent },
  { path: 'signup' , component: SignupComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {

}
