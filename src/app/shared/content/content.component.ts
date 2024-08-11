import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class ContentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
