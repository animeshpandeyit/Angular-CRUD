import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../service/employee.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
interface education {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css',
})
export class EmpAddEditComponent implements OnInit {
  educations: education[] = [
    { value: 'Senior Secondary Stage', viewValue: 'Senior Secondary Stage' },
    { value: 'Undergraduate Stage', viewValue: 'Undergraduate Stage' },
    { value: 'Postgraduate Stage', viewValue: 'Postgraduate Stage' },
  ];

  empForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _employeeService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.empForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dateofbirth: '',
      gender: '',
      education: '',
      companyName: '',
      workingExperience: '',
      currentPackage: '',
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.empForm.valid) {
      this._employeeService.addEmployee(this.empForm.value).subscribe(
        (res) => {
          console.log(res);
          this._dialogRef.close();
          this.openSnackBar(`Data added successfully`, 'Close');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      // duration: this.durationInSeconds * 1000,// Snackbar duration in milliseconds
    });
  }
}
