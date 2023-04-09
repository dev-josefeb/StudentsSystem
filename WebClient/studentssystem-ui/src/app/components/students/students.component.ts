import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/models/ui-models/student';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    // Fetch Students
    this.studentsService.getStudents().subscribe(
      (successResponse) => {
        this.students = successResponse;
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
}
