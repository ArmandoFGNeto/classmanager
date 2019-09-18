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
import { IGradeSchoolClass, GradeSchoolClass } from 'app/shared/model/grade-school-class.model';
import { GradeSchoolClassService } from './grade-school-class.service';
import { IHistorySchoolClass } from 'app/shared/model/history-school-class.model';
import { HistorySchoolClassService } from 'app/entities/history-school-class/history-school-class.service';
import { IStudentSchoolClass } from 'app/shared/model/student-school-class.model';
import { StudentSchoolClassService } from 'app/entities/student-school-class/student-school-class.service';

@Component({
  selector: 'jhi-grade-school-class-update',
  templateUrl: './grade-school-class-update.component.html'
})
export class GradeSchoolClassUpdateComponent implements OnInit {
  isSaving: boolean;

  histories: IHistorySchoolClass[];

  students: IStudentSchoolClass[];

  editForm = this.fb.group({
    id: [],
    applicationDate: [],
    value: [],
    studentId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected gradeService: GradeSchoolClassService,
    protected historyService: HistorySchoolClassService,
    protected studentService: StudentSchoolClassService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ grade }) => {
      this.updateForm(grade);
    });
    this.historyService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IHistorySchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<IHistorySchoolClass[]>) => response.body)
      )
      .subscribe((res: IHistorySchoolClass[]) => (this.histories = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.studentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStudentSchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStudentSchoolClass[]>) => response.body)
      )
      .subscribe((res: IStudentSchoolClass[]) => (this.students = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(grade: IGradeSchoolClass) {
    this.editForm.patchValue({
      id: grade.id,
      applicationDate: grade.applicationDate != null ? grade.applicationDate.format(DATE_TIME_FORMAT) : null,
      value: grade.value,
      studentId: grade.studentId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const grade = this.createFromForm();
    if (grade.id !== undefined) {
      this.subscribeToSaveResponse(this.gradeService.update(grade));
    } else {
      this.subscribeToSaveResponse(this.gradeService.create(grade));
    }
  }

  private createFromForm(): IGradeSchoolClass {
    return {
      ...new GradeSchoolClass(),
      id: this.editForm.get(['id']).value,
      applicationDate:
        this.editForm.get(['applicationDate']).value != null
          ? moment(this.editForm.get(['applicationDate']).value, DATE_TIME_FORMAT)
          : undefined,
      value: this.editForm.get(['value']).value,
      studentId: this.editForm.get(['studentId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGradeSchoolClass>>) {
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

  trackHistoryById(index: number, item: IHistorySchoolClass) {
    return item.id;
  }

  trackStudentById(index: number, item: IStudentSchoolClass) {
    return item.id;
  }
}
