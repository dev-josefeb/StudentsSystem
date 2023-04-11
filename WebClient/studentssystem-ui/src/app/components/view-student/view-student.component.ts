import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Gender } from 'src/app/models/ui-models/gender';
import { Student } from 'src/app/models/ui-models/student';
import { GendersService } from 'src/app/services/genders.service';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;

  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    },
  };

  genders: Gender[] = [];

  constructor(
    private readonly studentService: StudentsService,
    private readonly gendersService: GendersService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');

      if (this.studentId) {
        this.studentService
          .getStudent(this.studentId)
          .subscribe((successResponse) => {
            this.student = successResponse;
          });
      }

      this.gendersService.getGenders().subscribe((successResponse) => {
        this.genders = successResponse;
      });
    });
  }
}
