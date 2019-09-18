import { IGradeSchoolClass } from 'app/shared/model/grade-school-class.model';
import { ISchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';
import { IHistorySchoolClass } from 'app/shared/model/history-school-class.model';

export interface IStudentSchoolClass {
  id?: number;
  name?: string;
  age?: number;
  register?: string;
  grades?: IGradeSchoolClass[];
  schoolClasses?: ISchoolClassSchoolClass[];
  histories?: IHistorySchoolClass[];
}

export class StudentSchoolClass implements IStudentSchoolClass {
  constructor(
    public id?: number,
    public name?: string,
    public age?: number,
    public register?: string,
    public grades?: IGradeSchoolClass[],
    public schoolClasses?: ISchoolClassSchoolClass[],
    public histories?: IHistorySchoolClass[]
  ) {}
}
