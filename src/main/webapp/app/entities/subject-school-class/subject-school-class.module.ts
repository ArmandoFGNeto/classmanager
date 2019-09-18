import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClassmanagerSharedModule } from 'app/shared/shared.module';
import { SubjectSchoolClassComponent } from './subject-school-class.component';
import { SubjectSchoolClassDetailComponent } from './subject-school-class-detail.component';
import { SubjectSchoolClassUpdateComponent } from './subject-school-class-update.component';
import {
  SubjectSchoolClassDeletePopupComponent,
  SubjectSchoolClassDeleteDialogComponent
} from './subject-school-class-delete-dialog.component';
import { subjectRoute, subjectPopupRoute } from './subject-school-class.route';

const ENTITY_STATES = [...subjectRoute, ...subjectPopupRoute];

@NgModule({
  imports: [ClassmanagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SubjectSchoolClassComponent,
    SubjectSchoolClassDetailComponent,
    SubjectSchoolClassUpdateComponent,
    SubjectSchoolClassDeleteDialogComponent,
    SubjectSchoolClassDeletePopupComponent
  ],
  entryComponents: [
    SubjectSchoolClassComponent,
    SubjectSchoolClassUpdateComponent,
    SubjectSchoolClassDeleteDialogComponent,
    SubjectSchoolClassDeletePopupComponent
  ]
})
export class ClassmanagerSubjectSchoolClassModule {}
