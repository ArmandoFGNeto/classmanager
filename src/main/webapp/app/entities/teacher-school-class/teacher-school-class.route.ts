import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TeacherSchoolClass } from 'app/shared/model/teacher-school-class.model';
import { TeacherSchoolClassService } from './teacher-school-class.service';
import { TeacherSchoolClassComponent } from './teacher-school-class.component';
import { TeacherSchoolClassDetailComponent } from './teacher-school-class-detail.component';
import { TeacherSchoolClassUpdateComponent } from './teacher-school-class-update.component';
import { TeacherSchoolClassDeletePopupComponent } from './teacher-school-class-delete-dialog.component';
import { ITeacherSchoolClass } from 'app/shared/model/teacher-school-class.model';

@Injectable({ providedIn: 'root' })
export class TeacherSchoolClassResolve implements Resolve<ITeacherSchoolClass> {
  constructor(private service: TeacherSchoolClassService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITeacherSchoolClass> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TeacherSchoolClass>) => response.ok),
        map((teacher: HttpResponse<TeacherSchoolClass>) => teacher.body)
      );
    }
    return of(new TeacherSchoolClass());
  }
}

export const teacherRoute: Routes = [
  {
    path: '',
    component: TeacherSchoolClassComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'classmanagerApp.teacher.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TeacherSchoolClassDetailComponent,
    resolve: {
      teacher: TeacherSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.teacher.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TeacherSchoolClassUpdateComponent,
    resolve: {
      teacher: TeacherSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.teacher.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TeacherSchoolClassUpdateComponent,
    resolve: {
      teacher: TeacherSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.teacher.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const teacherPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TeacherSchoolClassDeletePopupComponent,
    resolve: {
      teacher: TeacherSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.teacher.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
