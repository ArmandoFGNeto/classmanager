import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StudentSchoolClass } from 'app/shared/model/student-school-class.model';
import { StudentSchoolClassService } from './student-school-class.service';
import { StudentSchoolClassComponent } from './student-school-class.component';
import { StudentSchoolClassDetailComponent } from './student-school-class-detail.component';
import { StudentSchoolClassUpdateComponent } from './student-school-class-update.component';
import { StudentSchoolClassDeletePopupComponent } from './student-school-class-delete-dialog.component';
import { IStudentSchoolClass } from 'app/shared/model/student-school-class.model';

@Injectable({ providedIn: 'root' })
export class StudentSchoolClassResolve implements Resolve<IStudentSchoolClass> {
  constructor(private service: StudentSchoolClassService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStudentSchoolClass> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<StudentSchoolClass>) => response.ok),
        map((student: HttpResponse<StudentSchoolClass>) => student.body)
      );
    }
    return of(new StudentSchoolClass());
  }
}

export const studentRoute: Routes = [
  {
    path: '',
    component: StudentSchoolClassComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'classmanagerApp.student.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StudentSchoolClassDetailComponent,
    resolve: {
      student: StudentSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.student.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StudentSchoolClassUpdateComponent,
    resolve: {
      student: StudentSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.student.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StudentSchoolClassUpdateComponent,
    resolve: {
      student: StudentSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.student.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const studentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StudentSchoolClassDeletePopupComponent,
    resolve: {
      student: StudentSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.student.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
