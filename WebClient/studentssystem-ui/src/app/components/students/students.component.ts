import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
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
    'edit',
  ];

  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  filterString = '';

  constructor(private studentsService: StudentsService) {}

  ngOnInit(): void {
    // Fetch Students
    this.studentsService.getStudents().subscribe(
      (successResponse) => {
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<Student>(this.students);

        if (this.matPaginator) {
          this.dataSource.paginator = this.matPaginator;
        }

        if (this.matSort) {
          this.dataSource.sort = this.matSort;
        }
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  filterStudents() {
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }
}
