import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';

type EntityResponseType = HttpResponse<ISchoolClassSchoolClass>;
type EntityArrayResponseType = HttpResponse<ISchoolClassSchoolClass[]>;

@Injectable({ providedIn: 'root' })
export class SchoolClassSchoolClassService {
  public resourceUrl = SERVER_API_URL + 'api/school-classes';

  constructor(protected http: HttpClient) {}

  create(schoolClass: ISchoolClassSchoolClass): Observable<EntityResponseType> {
    return this.http.post<ISchoolClassSchoolClass>(this.resourceUrl, schoolClass, { observe: 'response' });
  }

  update(schoolClass: ISchoolClassSchoolClass): Observable<EntityResponseType> {
    return this.http.put<ISchoolClassSchoolClass>(this.resourceUrl, schoolClass, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISchoolClassSchoolClass>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISchoolClassSchoolClass[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
