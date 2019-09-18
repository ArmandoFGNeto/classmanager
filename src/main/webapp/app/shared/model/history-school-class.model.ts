import { Moment } from 'moment';
import { IStudentSchoolClass } from 'app/shared/model/student-school-class.model';

export interface IHistorySchoolClass {
  id?: number;
  createdAt?: Moment;
  schoolClassId?: number;
  gradeId?: number;
  subjectId?: number;
  teacherId?: number;
  students?: IStudentSchoolClass[];
}

export class HistorySchoolClass implements IHistorySchoolClass {
  constructor(
    public id?: number,
    public createdAt?: Moment,
    public schoolClassId?: number,
    public gradeId?: number,
    public subjectId?: number,
    public teacherId?: number,
    public students?: IStudentSchoolClass[]
  ) {}
}
