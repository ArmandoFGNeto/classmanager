import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';

@Component({
  selector: 'jhi-school-class-school-class-detail',
  templateUrl: './school-class-school-class-detail.component.html'
})
export class SchoolClassSchoolClassDetailComponent implements OnInit {
  schoolClass: ISchoolClassSchoolClass;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ schoolClass }) => {
      this.schoolClass = schoolClass;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
