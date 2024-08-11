import { Component, Input, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [MatSidenavModule, MatListModule, RouterModule],
})
export class SidebarComponent implements OnInit {
  opened = true;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.opened = !this.opened;
  }
}
