import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SubjectSchoolClass } from 'app/shared/model/subject-school-class.model';
import { SubjectSchoolClassService } from './subject-school-class.service';
import { SubjectSchoolClassComponent } from './subject-school-class.component';
import { SubjectSchoolClassDetailComponent } from './subject-school-class-detail.component';
import { SubjectSchoolClassUpdateComponent } from './subject-school-class-update.component';
import { SubjectSchoolClassDeletePopupComponent } from './subject-school-class-delete-dialog.component';
import { ISubjectSchoolClass } from 'app/shared/model/subject-school-class.model';

@Injectable({ providedIn: 'root' })
export class SubjectSchoolClassResolve implements Resolve<ISubjectSchoolClass> {
  constructor(private service: SubjectSchoolClassService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISubjectSchoolClass> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SubjectSchoolClass>) => response.ok),
        map((subject: HttpResponse<SubjectSchoolClass>) => subject.body)
      );
    }
    return of(new SubjectSchoolClass());
  }
}

export const subjectRoute: Routes = [
  {
    path: '',
    component: SubjectSchoolClassComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'classmanagerApp.subject.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SubjectSchoolClassDetailComponent,
    resolve: {
      subject: SubjectSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.subject.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SubjectSchoolClassUpdateComponent,
    resolve: {
      subject: SubjectSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.subject.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SubjectSchoolClassUpdateComponent,
    resolve: {
      subject: SubjectSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.subject.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const subjectPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SubjectSchoolClassDeletePopupComponent,
    resolve: {
      subject: SubjectSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.subject.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
