import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHistorySchoolClass } from 'app/shared/model/history-school-class.model';

type EntityResponseType = HttpResponse<IHistorySchoolClass>;
type EntityArrayResponseType = HttpResponse<IHistorySchoolClass[]>;

@Injectable({ providedIn: 'root' })
export class HistorySchoolClassService {
  public resourceUrl = SERVER_API_URL + 'api/histories';

  constructor(protected http: HttpClient) {}

  create(history: IHistorySchoolClass): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(history);
    return this.http
      .post<IHistorySchoolClass>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(history: IHistorySchoolClass): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(history);
    return this.http
      .put<IHistorySchoolClass>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IHistorySchoolClass>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IHistorySchoolClass[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(history: IHistorySchoolClass): IHistorySchoolClass {
    const copy: IHistorySchoolClass = Object.assign({}, history, {
      createdAt: history.createdAt != null && history.createdAt.isValid() ? history.createdAt.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.createdAt = res.body.createdAt != null ? moment(res.body.createdAt) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((history: IHistorySchoolClass) => {
        history.createdAt = history.createdAt != null ? moment(history.createdAt) : null;
      });
    }
    return res;
  }
}
