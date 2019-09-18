import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HistorySchoolClass } from 'app/shared/model/history-school-class.model';
import { HistorySchoolClassService } from './history-school-class.service';
import { HistorySchoolClassComponent } from './history-school-class.component';
import { HistorySchoolClassDetailComponent } from './history-school-class-detail.component';
import { HistorySchoolClassUpdateComponent } from './history-school-class-update.component';
import { HistorySchoolClassDeletePopupComponent } from './history-school-class-delete-dialog.component';
import { IHistorySchoolClass } from 'app/shared/model/history-school-class.model';

@Injectable({ providedIn: 'root' })
export class HistorySchoolClassResolve implements Resolve<IHistorySchoolClass> {
  constructor(private service: HistorySchoolClassService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IHistorySchoolClass> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<HistorySchoolClass>) => response.ok),
        map((history: HttpResponse<HistorySchoolClass>) => history.body)
      );
    }
    return of(new HistorySchoolClass());
  }
}

export const historyRoute: Routes = [
  {
    path: '',
    component: HistorySchoolClassComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'classmanagerApp.history.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: HistorySchoolClassDetailComponent,
    resolve: {
      history: HistorySchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.history.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: HistorySchoolClassUpdateComponent,
    resolve: {
      history: HistorySchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.history.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: HistorySchoolClassUpdateComponent,
    resolve: {
      history: HistorySchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.history.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const historyPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: HistorySchoolClassDeletePopupComponent,
    resolve: {
      history: HistorySchoolClassResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'classmanagerApp.history.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
