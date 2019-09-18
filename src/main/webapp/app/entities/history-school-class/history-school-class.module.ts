import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ClassmanagerSharedModule } from 'app/shared/shared.module';
import { HistorySchoolClassComponent } from './history-school-class.component';
import { HistorySchoolClassDetailComponent } from './history-school-class-detail.component';
import { HistorySchoolClassUpdateComponent } from './history-school-class-update.component';
import {
  HistorySchoolClassDeletePopupComponent,
  HistorySchoolClassDeleteDialogComponent
} from './history-school-class-delete-dialog.component';
import { historyRoute, historyPopupRoute } from './history-school-class.route';

const ENTITY_STATES = [...historyRoute, ...historyPopupRoute];

@NgModule({
  imports: [ClassmanagerSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    HistorySchoolClassComponent,
    HistorySchoolClassDetailComponent,
    HistorySchoolClassUpdateComponent,
    HistorySchoolClassDeleteDialogComponent,
    HistorySchoolClassDeletePopupComponent
  ],
  entryComponents: [
    HistorySchoolClassComponent,
    HistorySchoolClassUpdateComponent,
    HistorySchoolClassDeleteDialogComponent,
    HistorySchoolClassDeletePopupComponent
  ]
})
export class ClassmanagerHistorySchoolClassModule {}
