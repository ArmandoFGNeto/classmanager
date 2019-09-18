import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITeacherSchoolClass } from 'app/shared/model/teacher-school-class.model';

@Component({
  selector: 'jhi-teacher-school-class-detail',
  templateUrl: './teacher-school-class-detail.component.html'
})
export class TeacherSchoolClassDetailComponent implements OnInit {
  teacher: ITeacherSchoolClass;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ teacher }) => {
      this.teacher = teacher;
    });
  }

  previousState() {
    window.history.back();
  }
}
