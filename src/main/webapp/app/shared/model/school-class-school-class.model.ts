import { ISubjectSchoolClass } from 'app/shared/model/subject-school-class.model';
import { IStudentSchoolClass } from 'app/shared/model/student-school-class.model';

export interface ISchoolClassSchoolClass {
  id?: number;
  name?: string;
  description?: any;
  historyId?: number;
  teacherId?: number;
  subjects?: ISubjectSchoolClass[];
  students?: IStudentSchoolClass[];
}

export class SchoolClassSchoolClass implements ISchoolClassSchoolClass {
  constructor(
    public id?: number,
    public name?: string,
    public description?: any,
    public historyId?: number,
    public teacherId?: number,
    public subjects?: ISubjectSchoolClass[],
    public students?: IStudentSchoolClass[]
  ) {}
}
