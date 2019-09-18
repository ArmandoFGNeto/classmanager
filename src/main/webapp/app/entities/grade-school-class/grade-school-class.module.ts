import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClassmanagerSharedModule } from 'app/shared/shared.module';
import { GradeSchoolClassComponent } from './grade-school-class.component';
import { GradeSchoolClassDetailComponent } from './grade-school-class-detail.component';
import { GradeSchoolClassUpdateComponent } from './grade-school-class-update.component';
import { GradeSchoolClassDeletePopupComponent, GradeSchoolClassDeleteDialogComponent } from './grade-school-class-delete-dialog.component';
import { gradeRoute, gradePopupRoute } from './grade-school-class.route';

const ENTITY_STATES = [...gradeRoute, ...gradePopupRoute];

@NgModule({
  imports: [ClassmanagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    GradeSchoolClassComponent,
    GradeSchoolClassDetailComponent,
    GradeSchoolClassUpdateComponent,
    GradeSchoolClassDeleteDialogComponent,
    GradeSchoolClassDeletePopupComponent
  ],
  entryComponents: [
    GradeSchoolClassComponent,
    GradeSchoolClassUpdateComponent,
    GradeSchoolClassDeleteDialogComponent,
    GradeSchoolClassDeletePopupComponent
  ]
})
export class ClassmanagerGradeSchoolClassModule {}
