import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { TenantDataService } from 'src/app/core/tenant.data.service';
@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrl: './tenant.component.css',
  standalone: true,
  imports:[MatTableModule, MatPaginatorModule, MatSortModule]
})
export class TenantComponent implements AfterViewInit  {
  displayedColumns: string[] = ['id', 'name', 'age', 'address'];
  dataSource = new MatTableDataSource<any>([]);
  totalItems = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private dataService: TenantDataService) {}
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => this.loadPage());
    this.loadPage();
  }

  loadPage() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;

    this.dataService.getData(pageIndex, pageSize).subscribe(data => {
      this.dataSource.data = data.items;
      this.totalItems = data.total;
    });
  }
}
