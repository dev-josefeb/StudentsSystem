import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from 'src/app/models/ui-models/student';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css'],
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  // Properties for mat-table
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'dateOfBirth',
    'email',
    'mobile',
    'gender',
  ];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    // Fetch Students
    this.studentsService.getStudents().subscribe(
      (successResponse) => {
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<Student>(this.students);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }
}
