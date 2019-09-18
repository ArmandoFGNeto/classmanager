import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGradeSchoolClass } from 'app/shared/model/grade-school-class.model';

type EntityResponseType = HttpResponse<IGradeSchoolClass>;
type EntityArrayResponseType = HttpResponse<IGradeSchoolClass[]>;

@Injectable({ providedIn: 'root' })
export class GradeSchoolClassService {
  public resourceUrl = SERVER_API_URL + 'api/grades';

  constructor(protected http: HttpClient) {}

  create(grade: IGradeSchoolClass): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grade);
    return this.http
      .post<IGradeSchoolClass>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(grade: IGradeSchoolClass): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(grade);
    return this.http
      .put<IGradeSchoolClass>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGradeSchoolClass>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGradeSchoolClass[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(grade: IGradeSchoolClass): IGradeSchoolClass {
    const copy: IGradeSchoolClass = Object.assign({}, grade, {
      applicationDate: grade.applicationDate != null && grade.applicationDate.isValid() ? grade.applicationDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.applicationDate = res.body.applicationDate != null ? moment(res.body.applicationDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((grade: IGradeSchoolClass) => {
        grade.applicationDate = grade.applicationDate != null ? moment(grade.applicationDate) : null;
      });
    }
    return res;
  }
}
