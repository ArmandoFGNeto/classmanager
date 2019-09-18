import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ISchoolClassSchoolClass, SchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';
import { SchoolClassSchoolClassService } from './school-class-school-class.service';
import { IHistorySchoolClass } from 'app/shared/model/history-school-class.model';
import { HistorySchoolClassService } from 'app/entities/history-school-class/history-school-class.service';
import { ITeacherSchoolClass } from 'app/shared/model/teacher-school-class.model';
import { TeacherSchoolClassService } from 'app/entities/teacher-school-class/teacher-school-class.service';
import { IStudentSchoolClass } from 'app/shared/model/student-school-class.model';
import { StudentSchoolClassService } from 'app/entities/student-school-class/student-school-class.service';

@Component({
  selector: 'jhi-school-class-school-class-update',
  templateUrl: './school-class-school-class-update.component.html'
})
export class SchoolClassSchoolClassUpdateComponent implements OnInit {
  isSaving: boolean;

  histories: IHistorySchoolClass[];

  teachers: ITeacherSchoolClass[];

  students: IStudentSchoolClass[];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required, Validators.maxLength(255)]],
    description: [],
    teacherId: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected schoolClassService: SchoolClassSchoolClassService,
    protected historyService: HistorySchoolClassService,
    protected teacherService: TeacherSchoolClassService,
    protected studentService: StudentSchoolClassService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ schoolClass }) => {
      this.updateForm(schoolClass);
    });
    this.historyService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IHistorySchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<IHistorySchoolClass[]>) => response.body)
      )
      .subscribe((res: IHistorySchoolClass[]) => (this.histories = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.teacherService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITeacherSchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITeacherSchoolClass[]>) => response.body)
      )
      .subscribe((res: ITeacherSchoolClass[]) => (this.teachers = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.studentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IStudentSchoolClass[]>) => mayBeOk.ok),
        map((response: HttpResponse<IStudentSchoolClass[]>) => response.body)
      )
      .subscribe((res: IStudentSchoolClass[]) => (this.students = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(schoolClass: ISchoolClassSchoolClass) {
    this.editForm.patchValue({
      id: schoolClass.id,
      name: schoolClass.name,
      description: schoolClass.description,
      teacherId: schoolClass.teacherId
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const schoolClass = this.createFromForm();
    if (schoolClass.id !== undefined) {
      this.subscribeToSaveResponse(this.schoolClassService.update(schoolClass));
    } else {
      this.subscribeToSaveResponse(this.schoolClassService.create(schoolClass));
    }
  }

  private createFromForm(): ISchoolClassSchoolClass {
    return {
      ...new SchoolClassSchoolClass(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      description: this.editForm.get(['description']).value,
      teacherId: this.editForm.get(['teacherId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISchoolClassSchoolClass>>) {
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
