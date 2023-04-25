import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
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

  isNewStudent = false;
  header = '';
  displayProfileImageUrl = '';

  genders: Gender[] = [];

  constructor(
    private readonly studentService: StudentsService,
    private readonly gendersService: GendersService,
    private snackbar: MatSnackBar,
    private router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.studentId = params.get('id');

      if (this.studentId) {
        if (this.studentId.toLowerCase() == 'Add'.toLowerCase()) {
          this.isNewStudent = true;
          this.header = 'Add Student';
          this.setImage();
        } else {
          this.isNewStudent = false;
          this.header = 'Edit Student';

          this.studentService.getStudent(this.studentId).subscribe(
            (successResponse) => {
              this.student = successResponse;
              this.setImage();
            },
            (errorResponse) => {
              this.setImage();
            }
          );
        }
      }

      this.gendersService.getGenders().subscribe((successResponse) => {
        this.genders = successResponse;
      });
    });
  }

  onUpdate(): void {
    this.studentService.updateStudent(this.student.id, this.student).subscribe(
      (successResponse) => {
        this.snackbar.open(
          `Student '${successResponse.firstName} ${successResponse.lastName} updated successfully`,
          undefined,
          {
            duration: 2000,
          }
        );
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  onDelete(): void {
    const notificationDelay = 2000;

    this.studentService.deleteStudent(this.student.id).subscribe(
      (successResponse) => {
        this.snackbar.open(
          `Student '${successResponse.firstName} ${successResponse.lastName}' deleted successfully`,
          undefined,
          {
            duration: notificationDelay,
          }
        );

        setTimeout(() => {
          this.router.navigateByUrl('students');
        }, notificationDelay);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  onAdd(): void {
    const notificationDelay = 2000;

    this.studentService.addStudent(this.student).subscribe(
      (successResponse) => {
        this.snackbar.open(
          `Student '${successResponse.firstName} ${successResponse.lastName}' added successfully`,
          undefined,
          {
            duration: notificationDelay,
          }
        );

        setTimeout(() => {
          this.router.navigateByUrl(`students/${successResponse.id}`);
        }, notificationDelay);
      },
      (errorResponse) => {
        console.log(errorResponse);
      }
    );
  }

  private setImage(): void {
    if (this.student.profileImageUrl) {
      this.displayProfileImageUrl = this.studentService.getImagePath(
        this.student.profileImageUrl
      );
    } else {
      this.displayProfileImageUrl = '/assets/user.png';
    }
  }

  uploadImage(event: any): void {
    if (this.studentId) {
      const file: File = event.target.files[0];

      this.studentService.uploadImage(this.student.id, file).subscribe(
        (successResponse) => {
          this.student.profileImageUrl = successResponse;
          this.setImage();

          this.snackbar.open(
            `Profile image upadted for Student '${successResponse.firstName} ${successResponse.lastName}'`,
            undefined,
            {
              duration: 2000,
            }
          );
        },
        (errorResponse) => {
          console.log(errorResponse);
        }
      );
    }
  }
}
