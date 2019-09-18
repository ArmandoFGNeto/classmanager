import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { GradeSchoolClassService } from 'app/entities/grade-school-class/grade-school-class.service';
import { IGradeSchoolClass, GradeSchoolClass } from 'app/shared/model/grade-school-class.model';

describe('Service Tests', () => {
  describe('GradeSchoolClass Service', () => {
    let injector: TestBed;
    let service: GradeSchoolClassService;
    let httpMock: HttpTestingController;
    let elemDefault: IGradeSchoolClass;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(GradeSchoolClassService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new GradeSchoolClass(0, currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            applicationDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a GradeSchoolClass', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            applicationDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            applicationDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new GradeSchoolClass(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a GradeSchoolClass', () => {
        const returnedFromService = Object.assign(
          {
            applicationDate: currentDate.format(DATE_TIME_FORMAT),
            value: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            applicationDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of GradeSchoolClass', () => {
        const returnedFromService = Object.assign(
          {
            applicationDate: currentDate.format(DATE_TIME_FORMAT),
            value: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            applicationDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a GradeSchoolClass', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
