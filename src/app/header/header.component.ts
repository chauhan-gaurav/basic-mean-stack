import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isUserAuthenticated = false;
  private authListenerSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(authenticated => {
      this.isUserAuthenticated = authenticated;
    });
  }
  ngOnDestroy() {
    this.authListenerSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
