import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './service/employee.service';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'dateofbirth',
    'gender',
    'education',
    'companyName',
    'workingExperience',
    'currentPackage',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialogue: MatDialog,
    private _employeeService: EmployeeService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm() {
    const DialogRef = this._dialogue.open(EmpAddEditComponent);

    DialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.getEmployeeList();
      }
    });
  }

  getEmployeeList() {
    this._employeeService.getEmployees().subscribe(
      (res) => {
        // console.log('employees found', res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {
    this._employeeService.deleteEmployeeData(id).subscribe(
      (res) => {
        console.log(res);
        this.getEmployeeList();
        this.openSnackBar(`Data deleted successfully`, 'Close');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openEditEmployeeForm(data: any) {
    const DialogRef = this._dialogue.open(EmpAddEditComponent, {
      data: data,
    });
    DialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.getEmployeeList();
      }
    });
  }
}
