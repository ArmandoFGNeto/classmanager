import { Moment } from 'moment';

export interface IGradeSchoolClass {
  id?: number;
  applicationDate?: Moment;
  value?: number;
  historyId?: number;
  studentId?: number;
}

export class GradeSchoolClass implements IGradeSchoolClass {
  constructor(
    public id?: number,
    public applicationDate?: Moment,
    public value?: number,
    public historyId?: number,
    public studentId?: number
  ) {}
}
