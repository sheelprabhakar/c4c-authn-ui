import { Component, Input, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [MatSidenavModule, MatListModule, RouterModule],
})
export class SidebarComponent implements OnInit {
  opened = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toggle() {
    this.opened = !this.opened;
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
