import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { GradeSchoolClass } from 'app/shared/model/grade-school-class.model';
import { GradeSchoolClassService } from './grade-school-class.service';
import { GradeSchoolClassComponent } from './grade-school-class.component';
import { GradeSchoolClassDetailComponent } from './grade-school-class-detail.component';
import { GradeSchoolClassUpdateComponent } from './grade-school-class-update.component';
import { GradeSchoolClassDeletePopupComponent } from './grade-school-class-delete-dialog.component';
import { IGradeSchoolClass } from 'app/shared/model/grade-school-class.model';

@Injectable({ providedIn: 'root' })
export class GradeSchoolClassResolve implements Resolve<IGradeSchoolClass> {
  constructor(private service: GradeSchoolClassService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGradeSchoolClass> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<GradeSchoolClass>) => response.ok),
        map((grade: HttpResponse<GradeSchoolClass>) => grade.body)
      );
    }
    return of(new GradeSchoolClass());
  }
}

export const gradeRoute: Routes = [
  {
    path: '',
    component: GradeSchoolClassComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'classmanagerApp.grade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: GradeSchoolClassDetailComponent,
    resolve: {
      grade: GradeSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.grade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: GradeSchoolClassUpdateComponent,
    resolve: {
      grade: GradeSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.grade.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: GradeSchoolClassUpdateComponent,
    resolve: {
      grade: GradeSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.grade.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const gradePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: GradeSchoolClassDeletePopupComponent,
    resolve: {
      grade: GradeSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.grade.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
