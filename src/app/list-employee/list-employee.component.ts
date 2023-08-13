import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent {
  employeeDetails: any;
  public empID: any;
  public popUp: boolean = false;

  constructor(private empService: EmployeeService) {}

  ngOnInit() {
    this.getData();
    this.empService.autoRefresh.subscribe(() => {
      this.getData();
    });
  }

  public getData() {
    this.empService
      .getAllEmployee()
      .subscribe((data) => (this.employeeDetails = data));
  }

  getSelectedID(id: any) {
    const data = document.getElementById('exampleModal');
    data?.classList.add('show');
    return (this.empID = id);
  }

  hideNumber(phone: any, length: number) {
    return phone.toString().substring(0, length) + '***';
  }
}
