import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/module/auth/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private _authService: AuthService, private router: Router) {}

  toggleMenu() {
    this.toggleSideBarForMe.emit();
  }

  async logout() {
    this._authService.removeSession();
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
