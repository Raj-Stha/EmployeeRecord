import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { EmployeeService } from '../employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css'],
})
export class DeleteEmployeeComponent implements OnChanges {
  @Input() empID: any;

  constructor(
    private _empService: EmployeeService,
    private toastr: ToastrService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.empID) {
      console.log(this.empID);
      this.showModal();
    }
  }

  showModal() {
    const data = document.getElementById('exampleModal');
    return data?.classList.add('show');
  }

  hideModal() {
    const data = document.getElementById('exampleModal');
    return data?.classList.remove('show');
  }

  deleteEmployee() {
    this._empService.deleteEmployee(this.empID).subscribe((data) => {
      this.toastr.error('Delected Successfully');
    });
    this.hideModal();
  }
}
