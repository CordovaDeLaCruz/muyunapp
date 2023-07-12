import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/module/auth/service/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  appropriateClass: string = '';

  @HostListener('window:resize', ['$event'])
  getScreenHeight() {
    //console.log(window.innerHeight);
    if (window.innerHeight <= 412) {
      this.appropriateClass = 'bottomRelative';
    } else {
      this.appropriateClass = 'bottomStick';
    }
  }
  constructor(private _authService: AuthService, private router: Router) {
    this.getScreenHeight();
  }

  ngOnInit(): void {}

  async logout() {
    this._authService.removeSession();
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
