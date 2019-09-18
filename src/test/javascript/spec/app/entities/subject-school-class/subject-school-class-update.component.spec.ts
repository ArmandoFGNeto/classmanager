import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ClassmanagerTestModule } from '../../../test.module';
import { SubjectSchoolClassUpdateComponent } from 'app/entities/subject-school-class/subject-school-class-update.component';
import { SubjectSchoolClassService } from 'app/entities/subject-school-class/subject-school-class.service';
import { SubjectSchoolClass } from 'app/shared/model/subject-school-class.model';

describe('Component Tests', () => {
  describe('SubjectSchoolClass Management Update Component', () => {
    let comp: SubjectSchoolClassUpdateComponent;
    let fixture: ComponentFixture<SubjectSchoolClassUpdateComponent>;
    let service: SubjectSchoolClassService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [SubjectSchoolClassUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SubjectSchoolClassUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubjectSchoolClassUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubjectSchoolClassService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubjectSchoolClass(123);
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
        const entity = new SubjectSchoolClass();
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
