import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClassmanagerSharedModule } from 'app/shared/shared.module';
import { SchoolClassSchoolClassComponent } from './school-class-school-class.component';
import { SchoolClassSchoolClassDetailComponent } from './school-class-school-class-detail.component';
import { SchoolClassSchoolClassUpdateComponent } from './school-class-school-class-update.component';
import {
  SchoolClassSchoolClassDeletePopupComponent,
  SchoolClassSchoolClassDeleteDialogComponent
} from './school-class-school-class-delete-dialog.component';
import { schoolClassRoute, schoolClassPopupRoute } from './school-class-school-class.route';

const ENTITY_STATES = [...schoolClassRoute, ...schoolClassPopupRoute];

@NgModule({
  imports: [ClassmanagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SchoolClassSchoolClassComponent,
    SchoolClassSchoolClassDetailComponent,
    SchoolClassSchoolClassUpdateComponent,
    SchoolClassSchoolClassDeleteDialogComponent,
    SchoolClassSchoolClassDeletePopupComponent
  ],
  entryComponents: [
    SchoolClassSchoolClassComponent,
    SchoolClassSchoolClassUpdateComponent,
    SchoolClassSchoolClassDeleteDialogComponent,
    SchoolClassSchoolClassDeletePopupComponent
  ]
})
export class ClassmanagerSchoolClassSchoolClassModule {}
