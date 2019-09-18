import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ClassmanagerTestModule } from '../../../test.module';
import { SchoolClassSchoolClassUpdateComponent } from 'app/entities/school-class-school-class/school-class-school-class-update.component';
import { SchoolClassSchoolClassService } from 'app/entities/school-class-school-class/school-class-school-class.service';
import { SchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';

describe('Component Tests', () => {
  describe('SchoolClassSchoolClass Management Update Component', () => {
    let comp: SchoolClassSchoolClassUpdateComponent;
    let fixture: ComponentFixture<SchoolClassSchoolClassUpdateComponent>;
    let service: SchoolClassSchoolClassService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [SchoolClassSchoolClassUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SchoolClassSchoolClassUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SchoolClassSchoolClassUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SchoolClassSchoolClassService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SchoolClassSchoolClass(123);
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
        const entity = new SchoolClassSchoolClass();
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
