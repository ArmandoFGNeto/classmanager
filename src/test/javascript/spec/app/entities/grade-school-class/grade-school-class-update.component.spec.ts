import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ClassmanagerTestModule } from '../../../test.module';
import { GradeSchoolClassUpdateComponent } from 'app/entities/grade-school-class/grade-school-class-update.component';
import { GradeSchoolClassService } from 'app/entities/grade-school-class/grade-school-class.service';
import { GradeSchoolClass } from 'app/shared/model/grade-school-class.model';

describe('Component Tests', () => {
  describe('GradeSchoolClass Management Update Component', () => {
    let comp: GradeSchoolClassUpdateComponent;
    let fixture: ComponentFixture<GradeSchoolClassUpdateComponent>;
    let service: GradeSchoolClassService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [GradeSchoolClassUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(GradeSchoolClassUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GradeSchoolClassUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GradeSchoolClassService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GradeSchoolClass(123);
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
        const entity = new GradeSchoolClass();
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
