import { ISchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';

export interface ITeacherSchoolClass {
  id?: number;
  name?: string;
  title?: string;
  payment?: number;
  schoolClasses?: ISchoolClassSchoolClass[];
  historyId?: number;
}

export class TeacherSchoolClass implements ITeacherSchoolClass {
  constructor(
    public id?: number,
    public name?: string,
    public title?: string,
    public payment?: number,
    public schoolClasses?: ISchoolClassSchoolClass[],
    public historyId?: number
  ) {}
}
