import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatToolbarModule],
})
export class HeaderComponent implements OnInit {
  @Output() sidebarToggle = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    this.sidebarToggle.emit();
  }
}
