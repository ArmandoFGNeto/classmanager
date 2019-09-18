import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClassmanagerSharedModule } from 'app/shared/shared.module';
import { TeacherSchoolClassComponent } from './teacher-school-class.component';
import { TeacherSchoolClassDetailComponent } from './teacher-school-class-detail.component';
import { TeacherSchoolClassUpdateComponent } from './teacher-school-class-update.component';
import {
  TeacherSchoolClassDeletePopupComponent,
  TeacherSchoolClassDeleteDialogComponent
} from './teacher-school-class-delete-dialog.component';
import { teacherRoute, teacherPopupRoute } from './teacher-school-class.route';

const ENTITY_STATES = [...teacherRoute, ...teacherPopupRoute];

@NgModule({
  imports: [ClassmanagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TeacherSchoolClassComponent,
    TeacherSchoolClassDetailComponent,
    TeacherSchoolClassUpdateComponent,
    TeacherSchoolClassDeleteDialogComponent,
    TeacherSchoolClassDeletePopupComponent
  ],
  entryComponents: [
    TeacherSchoolClassComponent,
    TeacherSchoolClassUpdateComponent,
    TeacherSchoolClassDeleteDialogComponent,
    TeacherSchoolClassDeletePopupComponent
  ]
})
export class ClassmanagerTeacherSchoolClassModule {}
