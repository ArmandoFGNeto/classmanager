import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubjectSchoolClass } from 'app/shared/model/subject-school-class.model';

@Component({
  selector: 'jhi-subject-school-class-detail',
  templateUrl: './subject-school-class-detail.component.html'
})
export class SubjectSchoolClassDetailComponent implements OnInit {
  subject: ISubjectSchoolClass;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ subject }) => {
      this.subject = subject;
    });
  }

  previousState() {
    window.history.back();
  }
}
