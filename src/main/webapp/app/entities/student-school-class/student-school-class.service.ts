import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStudentSchoolClass } from 'app/shared/model/student-school-class.model';

type EntityResponseType = HttpResponse<IStudentSchoolClass>;
type EntityArrayResponseType = HttpResponse<IStudentSchoolClass[]>;

@Injectable({ providedIn: 'root' })
export class StudentSchoolClassService {
  public resourceUrl = SERVER_API_URL + 'api/students';

  constructor(protected http: HttpClient) {}

  create(student: IStudentSchoolClass): Observable<EntityResponseType> {
    return this.http.post<IStudentSchoolClass>(this.resourceUrl, student, { observe: 'response' });
  }

  update(student: IStudentSchoolClass): Observable<EntityResponseType> {
    return this.http.put<IStudentSchoolClass>(this.resourceUrl, student, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStudentSchoolClass>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStudentSchoolClass[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
