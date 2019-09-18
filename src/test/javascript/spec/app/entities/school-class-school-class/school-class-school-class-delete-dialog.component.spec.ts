import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ClassmanagerTestModule } from '../../../test.module';
import { SchoolClassSchoolClassDeleteDialogComponent } from 'app/entities/school-class-school-class/school-class-school-class-delete-dialog.component';
import { SchoolClassSchoolClassService } from 'app/entities/school-class-school-class/school-class-school-class.service';

describe('Component Tests', () => {
  describe('SchoolClassSchoolClass Management Delete Component', () => {
    let comp: SchoolClassSchoolClassDeleteDialogComponent;
    let fixture: ComponentFixture<SchoolClassSchoolClassDeleteDialogComponent>;
    let service: SchoolClassSchoolClassService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [SchoolClassSchoolClassDeleteDialogComponent]
      })
        .overrideTemplate(SchoolClassSchoolClassDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SchoolClassSchoolClassDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SchoolClassSchoolClassService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
