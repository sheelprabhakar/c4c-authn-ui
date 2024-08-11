import { Component, OnInit, ViewChild } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { ContentComponent } from '../content/content.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
    ContentComponent,
  ],
})
export class LayoutComponent implements OnInit {
  @ViewChild(SidebarComponent) sidebarComponent!: SidebarComponent;
  sidebarOpened = true;

  constructor() {}

  ngOnInit(): void {}

  toggleSidebar() {
    console.log('Side bar toggle', this.sidebarComponent);
    this.sidebarComponent.toggle();
  }
}
