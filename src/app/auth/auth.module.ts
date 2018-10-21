import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from 'src/app/auth/auth-routing.module';

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    RouterModule,
    AuthRoutingModule
  ]
})
export class AuthModule {}
