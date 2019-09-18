import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClassmanagerSharedModule } from 'app/shared/shared.module';
import { StudentSchoolClassComponent } from './student-school-class.component';
import { StudentSchoolClassDetailComponent } from './student-school-class-detail.component';
import { StudentSchoolClassUpdateComponent } from './student-school-class-update.component';
import {
  StudentSchoolClassDeletePopupComponent,
  StudentSchoolClassDeleteDialogComponent
} from './student-school-class-delete-dialog.component';
import { studentRoute, studentPopupRoute } from './student-school-class.route';

const ENTITY_STATES = [...studentRoute, ...studentPopupRoute];

@NgModule({
  imports: [ClassmanagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StudentSchoolClassComponent,
    StudentSchoolClassDetailComponent,
    StudentSchoolClassUpdateComponent,
    StudentSchoolClassDeleteDialogComponent,
    StudentSchoolClassDeletePopupComponent
  ],
  entryComponents: [
    StudentSchoolClassComponent,
    StudentSchoolClassUpdateComponent,
    StudentSchoolClassDeleteDialogComponent,
    StudentSchoolClassDeletePopupComponent
  ]
})
export class ClassmanagerStudentSchoolClassModule {}
