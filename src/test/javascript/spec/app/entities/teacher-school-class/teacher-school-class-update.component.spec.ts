import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ClassmanagerTestModule } from '../../../test.module';
import { TeacherSchoolClassUpdateComponent } from 'app/entities/teacher-school-class/teacher-school-class-update.component';
import { TeacherSchoolClassService } from 'app/entities/teacher-school-class/teacher-school-class.service';
import { TeacherSchoolClass } from 'app/shared/model/teacher-school-class.model';

describe('Component Tests', () => {
  describe('TeacherSchoolClass Management Update Component', () => {
    let comp: TeacherSchoolClassUpdateComponent;
    let fixture: ComponentFixture<TeacherSchoolClassUpdateComponent>;
    let service: TeacherSchoolClassService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [TeacherSchoolClassUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(TeacherSchoolClassUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(TeacherSchoolClassUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TeacherSchoolClassService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new TeacherSchoolClass(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new TeacherSchoolClass();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
