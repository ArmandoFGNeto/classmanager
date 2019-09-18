import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ClassmanagerTestModule } from '../../../test.module';
import { StudentSchoolClassUpdateComponent } from 'app/entities/student-school-class/student-school-class-update.component';
import { StudentSchoolClassService } from 'app/entities/student-school-class/student-school-class.service';
import { StudentSchoolClass } from 'app/shared/model/student-school-class.model';

describe('Component Tests', () => {
  describe('StudentSchoolClass Management Update Component', () => {
    let comp: StudentSchoolClassUpdateComponent;
    let fixture: ComponentFixture<StudentSchoolClassUpdateComponent>;
    let service: StudentSchoolClassService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [StudentSchoolClassUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StudentSchoolClassUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StudentSchoolClassUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StudentSchoolClassService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StudentSchoolClass(123);
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
        const entity = new StudentSchoolClass();
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
