import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IHistorySchoolClass, HistorySchoolClass } from 'app/shared/model/history-school-class.model';
import { HistorySchoolClassService } from './history-school-class.service';
import { ISchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';
import { SchoolClassSchoolClassService } from 'app/entities/school-class-school-class/school-class-school-class.service';
import { IGradeSchoolClass } from 'app/shared/model/grade-school-class.model';
import { GradeSchoolClassService } from 'app/entities/grade-school-class/grade-school-class.service';
import { ISubjectSchoolClass } from 'app/shared/model/subject-school-class.model';
import { SubjectSchoolClassService } from 'app/entities/subject-school-class/subject-school-class.service';
import { ITeacherSchoolClass } from 'app/shared/model/teacher-school-class.model';
import { TeacherSchoolClassService } from 'app/entities/teacher-school-class/teacher-school-class.service';
import { IStudentSchoolClass } from 'app/shared/model/student-school-class.model';
import { StudentSchoolClassService } from 'app/entities/student-school-class/student-school-class.service';

@Component({
  selector: 'jhi-history-school-class-update',
  templateUrl: './history-school-class-update.component.html'
})
export class HistorySchoolClassUpdateComponent implements OnInit {
  isSaving: boolean;

  schoolclasses: ISchoolClassSchoolClass[];

  grades: IGradeSchoolClass[];

  subjects: ISubjectSchoolClass[];

  teachers: ITeacherSchoolClass[];

  students: IStudentSchoolClass[];

  editForm = this.fb.group({
    id: [],
    createdAt: [],
    schoolClassId: [],
    gradeId: [],
    subjectId: [],
    teacherId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected historyService: HistorySchoolClassService,
    protected schoolClassService: SchoolClassSchoolClassService,
    protected gradeService: GradeSchoolClassService,
    protected subjectService: SubjectSchoolClassService,
    protected teacherService: TeacherSchoolClassService,
    protected studentService: StudentSchoolClassService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ history }) => {
      this.updateForm(history);
    });
    this.schoolClassService
      .query({ filter: 'history-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ISchoolClassSchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISchoolClassSchoolClass[]>) => response.body)
      )
      .subscribe(
        (res: ISchoolClassSchoolClass[]) => {
          if (!this.editForm.get('schoolClassId').value) {
            this.schoolclasses = res;
          } else {
            this.schoolClassService
              .find(this.editForm.get('schoolClassId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ISchoolClassSchoolClass>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ISchoolClassSchoolClass>) => subResponse.body)
              )
              .subscribe(
                (subRes: ISchoolClassSchoolClass) => (this.schoolclasses = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.gradeService
      .query({ filter: 'history-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IGradeSchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<IGradeSchoolClass[]>) => response.body)
      )
      .subscribe(
        (res: IGradeSchoolClass[]) => {
          if (!this.editForm.get('gradeId').value) {
            this.grades = res;
          } else {
            this.gradeService
              .find(this.editForm.get('gradeId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IGradeSchoolClass>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IGradeSchoolClass>) => subResponse.body)
              )
              .subscribe(
                (subRes: IGradeSchoolClass) => (this.grades = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.subjectService
      .query({ filter: 'history-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ISubjectSchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISubjectSchoolClass[]>) => response.body)
      )
      .subscribe(
        (res: ISubjectSchoolClass[]) => {
          if (!this.editForm.get('subjectId').value) {
            this.subjects = res;
          } else {
            this.subjectService
              .find(this.editForm.get('subjectId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ISubjectSchoolClass>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ISubjectSchoolClass>) => subResponse.body)
              )
              .subscribe(
                (subRes: ISubjectSchoolClass) => (this.subjects = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.teacherService
      .query({ filter: 'history-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<ITeacherSchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITeacherSchoolClass[]>) => response.body)
      )
      .subscribe(
        (res: ITeacherSchoolClass[]) => {
          if (!this.editForm.get('teacherId').value) {
            this.teachers = res;
          } else {
            this.teacherService
              .find(this.editForm.get('teacherId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<ITeacherSchoolClass>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<ITeacherSchoolClass>) => subResponse.body)
              )
              .subscribe(
                (subRes: ITeacherSchoolClass) => (this.teachers = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.studentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStudentSchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStudentSchoolClass[]>) => response.body)
      )
      .subscribe((res: IStudentSchoolClass[]) => (this.students = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(history: IHistorySchoolClass) {
    this.editForm.patchValue({
      id: history.id,
      createdAt: history.createdAt != null ? history.createdAt.format(DATE_TIME_FORMAT) : null,
      schoolClassId: history.schoolClassId,
      gradeId: history.gradeId,
      subjectId: history.subjectId,
      teacherId: history.teacherId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const history = this.createFromForm();
    if (history.id !== undefined) {
      this.subscribeToSaveResponse(this.historyService.update(history));
    } else {
      this.subscribeToSaveResponse(this.historyService.create(history));
    }
  }

  private createFromForm(): IHistorySchoolClass {
    return {
      ...new HistorySchoolClass(),
      id: this.editForm.get(['id']).value,
      createdAt:
        this.editForm.get(['createdAt']).value != null ? moment(this.editForm.get(['createdAt']).value, DATE_TIME_FORMAT) : undefined,
      schoolClassId: this.editForm.get(['schoolClassId']).value,
      gradeId: this.editForm.get(['gradeId']).value,
      subjectId: this.editForm.get(['subjectId']).value,
      teacherId: this.editForm.get(['teacherId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistorySchoolClass>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackSchoolClassById(index: number, item: ISchoolClassSchoolClass) {
    return item.id;
  }

  trackGradeById(index: number, item: IGradeSchoolClass) {
    return item.id;
  }

  trackSubjectById(index: number, item: ISubjectSchoolClass) {
    return item.id;
  }

  trackTeacherById(index: number, item: ITeacherSchoolClass) {
    return item.id;
  }

  trackStudentById(index: number, item: IStudentSchoolClass) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
