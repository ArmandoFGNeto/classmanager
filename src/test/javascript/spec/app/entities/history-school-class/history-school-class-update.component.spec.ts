import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ClassmanagerTestModule } from '../../../test.module';
import { HistorySchoolClassUpdateComponent } from 'app/entities/history-school-class/history-school-class-update.component';
import { HistorySchoolClassService } from 'app/entities/history-school-class/history-school-class.service';
import { HistorySchoolClass } from 'app/shared/model/history-school-class.model';

describe('Component Tests', () => {
  describe('HistorySchoolClass Management Update Component', () => {
    let comp: HistorySchoolClassUpdateComponent;
    let fixture: ComponentFixture<HistorySchoolClassUpdateComponent>;
    let service: HistorySchoolClassService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [HistorySchoolClassUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(HistorySchoolClassUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(HistorySchoolClassUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(HistorySchoolClassService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new HistorySchoolClass(123);
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
        const entity = new HistorySchoolClass();
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
