import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'student-school-class',
        loadChildren: () => import('./student-school-class/student-school-class.module').then(m => m.ClassmanagerStudentSchoolClassModule)
      },
      {
        path: 'school-class-school-class',
        loadChildren: () =>
          import('./school-class-school-class/school-class-school-class.module').then(m => m.ClassmanagerSchoolClassSchoolClassModule)
      },
      {
        path: 'teacher-school-class',
        loadChildren: () => import('./teacher-school-class/teacher-school-class.module').then(m => m.ClassmanagerTeacherSchoolClassModule)
      },
      {
        path: 'subject-school-class',
        loadChildren: () => import('./subject-school-class/subject-school-class.module').then(m => m.ClassmanagerSubjectSchoolClassModule)
      },
      {
        path: 'grade-school-class',
        loadChildren: () => import('./grade-school-class/grade-school-class.module').then(m => m.ClassmanagerGradeSchoolClassModule)
      },
      {
        path: 'history-school-class',
        loadChildren: () => import('./history-school-class/history-school-class.module').then(m => m.ClassmanagerHistorySchoolClassModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: []
})
export class ClassmanagerEntityModule {}
