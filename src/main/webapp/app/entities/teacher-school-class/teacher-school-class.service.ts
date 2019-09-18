import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITeacherSchoolClass } from 'app/shared/model/teacher-school-class.model';

type EntityResponseType = HttpResponse<ITeacherSchoolClass>;
type EntityArrayResponseType = HttpResponse<ITeacherSchoolClass[]>;

@Injectable({ providedIn: 'root' })
export class TeacherSchoolClassService {
  public resourceUrl = SERVER_API_URL + 'api/teachers';

  constructor(protected http: HttpClient) {}

  create(teacher: ITeacherSchoolClass): Observable<EntityResponseType> {
    return this.http.post<ITeacherSchoolClass>(this.resourceUrl, teacher, { observe: 'response' });
  }

  update(teacher: ITeacherSchoolClass): Observable<EntityResponseType> {
    return this.http.put<ITeacherSchoolClass>(this.resourceUrl, teacher, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITeacherSchoolClass>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITeacherSchoolClass[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
