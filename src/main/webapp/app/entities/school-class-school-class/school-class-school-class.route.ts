import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';
import { SchoolClassSchoolClassService } from './school-class-school-class.service';
import { SchoolClassSchoolClassComponent } from './school-class-school-class.component';
import { SchoolClassSchoolClassDetailComponent } from './school-class-school-class-detail.component';
import { SchoolClassSchoolClassUpdateComponent } from './school-class-school-class-update.component';
import { SchoolClassSchoolClassDeletePopupComponent } from './school-class-school-class-delete-dialog.component';
import { ISchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';

@Injectable({ providedIn: 'root' })
export class SchoolClassSchoolClassResolve implements Resolve<ISchoolClassSchoolClass> {
  constructor(private service: SchoolClassSchoolClassService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISchoolClassSchoolClass> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SchoolClassSchoolClass>) => response.ok),
        map((schoolClass: HttpResponse<SchoolClassSchoolClass>) => schoolClass.body)
      );
    }
    return of(new SchoolClassSchoolClass());
  }
}

export const schoolClassRoute: Routes = [
  {
    path: '',
    component: SchoolClassSchoolClassComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'classmanagerApp.schoolClass.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SchoolClassSchoolClassDetailComponent,
    resolve: {
      schoolClass: SchoolClassSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.schoolClass.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SchoolClassSchoolClassUpdateComponent,
    resolve: {
      schoolClass: SchoolClassSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.schoolClass.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SchoolClassSchoolClassUpdateComponent,
    resolve: {
      schoolClass: SchoolClassSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.schoolClass.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const schoolClassPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SchoolClassSchoolClassDeletePopupComponent,
    resolve: {
      schoolClass: SchoolClassSchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.schoolClass.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
