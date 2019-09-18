import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITeacherSchoolClass, TeacherSchoolClass } from 'app/shared/model/teacher-school-class.model';
import { TeacherSchoolClassService } from './teacher-school-class.service';
import { IHistorySchoolClass } from 'app/shared/model/history-school-class.model';
import { HistorySchoolClassService } from 'app/entities/history-school-class/history-school-class.service';

@Component({
  selector: 'jhi-teacher-school-class-update',
  templateUrl: './teacher-school-class-update.component.html'
})
export class TeacherSchoolClassUpdateComponent implements OnInit {
  isSaving: boolean;

  histories: IHistorySchoolClass[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(255)]],
    title: [null, [Validators.required, Validators.maxLength(50)]],
    payment: [null, [Validators.required]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected teacherService: TeacherSchoolClassService,
    protected historyService: HistorySchoolClassService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ teacher }) => {
      this.updateForm(teacher);
    });
    this.historyService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IHistorySchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<IHistorySchoolClass[]>) => response.body)
      )
      .subscribe((res: IHistorySchoolClass[]) => (this.histories = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(teacher: ITeacherSchoolClass) {
    this.editForm.patchValue({
      id: teacher.id,
      name: teacher.name,
      title: teacher.title,
      payment: teacher.payment
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const teacher = this.createFromForm();
    if (teacher.id !== undefined) {
      this.subscribeToSaveResponse(this.teacherService.update(teacher));
    } else {
      this.subscribeToSaveResponse(this.teacherService.create(teacher));
    }
  }

  private createFromForm(): ITeacherSchoolClass {
    return {
      ...new TeacherSchoolClass(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      title: this.editForm.get(['title']).value,
      payment: this.editForm.get(['payment']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeacherSchoolClass>>) {
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
}
