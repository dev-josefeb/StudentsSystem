import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student';
import { UpdateStudentRequest } from '../models/api-models/update-student-request';
import { AddStudentRequest } from '../models/api-models/add-student-request';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private baseApiUrl = 'https://localhost:7150';

  constructor(private httpClient: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students');
  }

  getStudent(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(
      this.baseApiUrl + '/students/' + studentId
    );
  }

  updateStudent(
    studentId: string,
    studentRequest: Student
  ): Observable<Student> {
    const updateStudentRequest: UpdateStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };

    return this.httpClient.put<Student>(
      this.baseApiUrl + '/students/' + studentId,
      updateStudentRequest
    );
  }

  deleteStudent(studentId: string): Observable<Student> {
    return this.httpClient.delete<Student>(
      this.baseApiUrl + '/students/' + studentId
    );
  }

  addStudent(studentRequest: Student): Observable<Student> {
    const addStudentRequest: AddStudentRequest = {
      firstName: studentRequest.firstName,
      lastName: studentRequest.lastName,
      dateOfBirth: studentRequest.dateOfBirth,
      email: studentRequest.email,
      mobile: studentRequest.mobile,
      genderId: studentRequest.genderId,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };

    return this.httpClient.post<Student>(
      this.baseApiUrl + '/students/add',
      addStudentRequest
    );
  }
}
