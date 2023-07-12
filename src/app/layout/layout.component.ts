import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  isSidebarOpened: boolean;

  constructor() {
    this.isSidebarOpened = true;
  }

  ngOnInit(): void {}

  sideBarToggler(){
    this.isSidebarOpened = !this.isSidebarOpened
  }
}
