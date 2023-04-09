import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    // Fetch Students
    this.studentsService.getStudents().subscribe(
      (successResponse) => {
        console.log(successResponse);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
}
