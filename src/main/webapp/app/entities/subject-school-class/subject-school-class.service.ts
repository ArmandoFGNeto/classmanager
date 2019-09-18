import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISubjectSchoolClass } from 'app/shared/model/subject-school-class.model';

type EntityResponseType = HttpResponse<ISubjectSchoolClass>;
type EntityArrayResponseType = HttpResponse<ISubjectSchoolClass[]>;

@Injectable({ providedIn: 'root' })
export class SubjectSchoolClassService {
  public resourceUrl = SERVER_API_URL + 'api/subjects';

  constructor(protected http: HttpClient) {}

  create(subject: ISubjectSchoolClass): Observable<EntityResponseType> {
    return this.http.post<ISubjectSchoolClass>(this.resourceUrl, subject, { observe: 'response' });
  }

  update(subject: ISubjectSchoolClass): Observable<EntityResponseType> {
    return this.http.put<ISubjectSchoolClass>(this.resourceUrl, subject, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubjectSchoolClass>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubjectSchoolClass[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
