export interface ISubjectSchoolClass {
  id?: number;
  name?: string;
  threshold?: number;
  schoolClassId?: number;
  historyId?: number;
}

export class SubjectSchoolClass implements ISubjectSchoolClass {
  constructor(
    public id?: number,
    public name?: string,
    public threshold?: number,
    public schoolClassId?: number,
    public historyId?: number
  ) {}
}
