import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStudentSchoolClass, StudentSchoolClass } from 'app/shared/model/student-school-class.model';
import { StudentSchoolClassService } from './student-school-class.service';
import { ISchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';
import { SchoolClassSchoolClassService } from 'app/entities/school-class-school-class/school-class-school-class.service';
import { IHistorySchoolClass } from 'app/shared/model/history-school-class.model';
import { HistorySchoolClassService } from 'app/entities/history-school-class/history-school-class.service';

@Component({
  selector: 'jhi-student-school-class-update',
  templateUrl: './student-school-class-update.component.html'
})
export class StudentSchoolClassUpdateComponent implements OnInit {
  isSaving: boolean;

  schoolclasses: ISchoolClassSchoolClass[];

  histories: IHistorySchoolClass[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(255)]],
    age: [],
    register: [null, [Validators.required]],
    schoolClasses: [],
    histories: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected studentService: StudentSchoolClassService,
    protected schoolClassService: SchoolClassSchoolClassService,
    protected historyService: HistorySchoolClassService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ student }) => {
      this.updateForm(student);
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

  updateForm(student: IStudentSchoolClass) {
    this.editForm.patchValue({
      id: student.id,
      name: student.name,
      age: student.age,
      register: student.register,
      schoolClasses: student.schoolClasses,
      histories: student.histories
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const student = this.createFromForm();
    if (student.id !== undefined) {
      this.subscribeToSaveResponse(this.studentService.update(student));
    } else {
      this.subscribeToSaveResponse(this.studentService.create(student));
    }
  }

  private createFromForm(): IStudentSchoolClass {
    return {
      ...new StudentSchoolClass(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      age: this.editForm.get(['age']).value,
      register: this.editForm.get(['register']).value,
      schoolClasses: this.editForm.get(['schoolClasses']).value,
      histories: this.editForm.get(['histories']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStudentSchoolClass>>) {
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
