import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGradeSchoolClass } from 'app/shared/model/grade-school-class.model';

@Component({
  selector: 'jhi-grade-school-class-detail',
  templateUrl: './grade-school-class-detail.component.html'
})
export class GradeSchoolClassDetailComponent implements OnInit {
  grade: IGradeSchoolClass;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ grade }) => {
      this.grade = grade;
    });
  }

  previousState() {
    window.history.back();
  }
}
