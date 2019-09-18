import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISubjectSchoolClass, SubjectSchoolClass } from 'app/shared/model/subject-school-class.model';
import { SubjectSchoolClassService } from './subject-school-class.service';
import { ISchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';
import { SchoolClassSchoolClassService } from 'app/entities/school-class-school-class/school-class-school-class.service';
import { IHistorySchoolClass } from 'app/shared/model/history-school-class.model';
import { HistorySchoolClassService } from 'app/entities/history-school-class/history-school-class.service';

@Component({
  selector: 'jhi-subject-school-class-update',
  templateUrl: './subject-school-class-update.component.html'
})
export class SubjectSchoolClassUpdateComponent implements OnInit {
  isSaving: boolean;

  schoolclasses: ISchoolClassSchoolClass[];

  histories: IHistorySchoolClass[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    threshold: [null, [Validators.required]],
    schoolClassId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected subjectService: SubjectSchoolClassService,
    protected schoolClassService: SchoolClassSchoolClassService,
    protected historyService: HistorySchoolClassService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ subject }) => {
      this.updateForm(subject);
    });
    this.schoolClassService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISchoolClassSchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISchoolClassSchoolClass[]>) => response.body)
      )
      .subscribe((res: ISchoolClassSchoolClass[]) => (this.schoolclasses = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.historyService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IHistorySchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<IHistorySchoolClass[]>) => response.body)
      )
      .subscribe((res: IHistorySchoolClass[]) => (this.histories = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(subject: ISubjectSchoolClass) {
    this.editForm.patchValue({
      id: subject.id,
      name: subject.name,
      threshold: subject.threshold,
      schoolClassId: subject.schoolClassId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const subject = this.createFromForm();
    if (subject.id !== undefined) {
      this.subscribeToSaveResponse(this.subjectService.update(subject));
    } else {
      this.subscribeToSaveResponse(this.subjectService.create(subject));
    }
  }

  private createFromForm(): ISubjectSchoolClass {
    return {
      ...new SubjectSchoolClass(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      threshold: this.editForm.get(['threshold']).value,
      schoolClassId: this.editForm.get(['schoolClassId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubjectSchoolClass>>) {
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

  trackHistoryById(index: number, item: IHistorySchoolClass) {
    return item.id;
  }
}
