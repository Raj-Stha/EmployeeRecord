import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent {
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private toastr: ToastrService
  ) {}

  empDetail = this.formBuilder.group({
    employeeName: [
      '',
      [Validators.required, Validators.maxLength(30), Validators.minLength(4)],
    ],
    designation: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    mobile: [
      '',
      [
        Validators.required,
        Validators.min(1111111111),
        Validators.max(9999999999),
      ],
    ],
    active: ['', Validators.required],
  });

  validate(name: string) {
    return this.empDetail.get(name)?.invalid && this.submitted;
  }

  resetForm() {
    this.empDetail.reset();
    return (this.submitted = false);
  }

  createEmployee() {
    this.submitted = true;
    if (this.empDetail.valid) {
      this.empService.addEmployee(this.empDetail.value).subscribe((data) => {
        this.resetForm();
        this.toastr.success('Employee Created');
      });
    }
  }
}
