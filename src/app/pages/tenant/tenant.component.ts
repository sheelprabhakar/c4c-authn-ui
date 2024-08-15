import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { TenantDataService } from 'src/app/core/tenant/tenant.data.service';
import { environment as env } from 'src/environments/environment';
import { TenantData } from 'src/app/core/tenant/tenant.data.model';
import { TableHeightDirective } from '../../shared/directives/table-height-directive';
import { MatDividerModule } from '@angular/material/divider';
@Component({
  selector: 'app-tenant',
  templateUrl: './tenant.component.html',
  styleUrl: './tenant.component.scss',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatDividerModule,
    TableHeightDirective,
  ],
})
export class TenantComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'address',
    'cityId',
    'pin',
    'phone',
    'mobile',
    'shortName',
    'updatedAt',
    'active',
  ];
  selection = new SelectionModel<TenantData>(true, []);
  dataSource = new MatTableDataSource<any>([]);
  totalItems = 0;
  pageSize = env.pageSize;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private dataService: TenantDataService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => this.loadPage());
    this.loadPage();
  }

  loadPage() {
    const pageIndex = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;

    this.dataService
      .getData<TenantData>(pageIndex, pageSize)
      .subscribe((data) => {
        const row =data.items[0];
        for(let i=0; i < 15; ++i){
          let obj2 = JSON.parse(JSON.stringify(row));
          data.items.push(obj2);
        }
        data.total=16;
        this.dataSource.data = data.items;
        this.dataSource.sort = this.sort;
        this.totalItems = data.total;
      });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
}
