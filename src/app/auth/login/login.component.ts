import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  isLoading = false;
  constructor(public authService: AuthService) { }

  private authStatusSub: Subscription;

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
  }

  onLogin(form: NgForm) {
     if (form.invalid) {
       return;
      }
      this.authService.login(form.value.email, form.value.password );
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
