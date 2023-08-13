import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent {
  private _id: any;
  public details: any;
  public submitted = false;
  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get('id');
    this.empService.getSigleEmployee(this._id).subscribe((data) => {
      this.details = data;

      this.empDetail.patchValue({
        employeeName: this.details.employeeName,
        designation: this.details.designation,
        mobile: this.details.mobile,
        active: this.details.active,
      });
    });
  }

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

  updateEmployee() {
    this.submitted = true;
    if (
      (this.empDetail.valid &&
        this.empDetail.value.employeeName !== this.details.employeeName) ||
      this.empDetail.value.designation !== this.details.designation ||
      this.empDetail.value.mobile !== this.details.mobile ||
      this.empDetail.value.active !== this.details.active
    ) {
      this.empService
        .updateSingleEmploye(this._id, this.empDetail.value)
        .subscribe((data) => {
          this.toastr.success('Updated Successfully');
        });
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else {
      this.toastr.warning('No Changes Applied');
    }
  }
}
