import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStudentSchoolClass } from 'app/shared/model/student-school-class.model';

@Component({
  selector: 'jhi-student-school-class-detail',
  templateUrl: './student-school-class-detail.component.html'
})
export class StudentSchoolClassDetailComponent implements OnInit {
  student: IStudentSchoolClass;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ student }) => {
      this.student = student;
    });
  }

  previousState() {
    window.history.back();
  }
}
