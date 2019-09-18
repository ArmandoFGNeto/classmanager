import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ClassmanagerTestModule } from '../../../test.module';
import { SubjectSchoolClassDeleteDialogComponent } from 'app/entities/subject-school-class/subject-school-class-delete-dialog.component';
import { SubjectSchoolClassService } from 'app/entities/subject-school-class/subject-school-class.service';

describe('Component Tests', () => {
  describe('SubjectSchoolClass Management Delete Component', () => {
    let comp: SubjectSchoolClassDeleteDialogComponent;
    let fixture: ComponentFixture<SubjectSchoolClassDeleteDialogComponent>;
    let service: SubjectSchoolClassService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [SubjectSchoolClassDeleteDialogComponent]
      })
        .overrideTemplate(SubjectSchoolClassDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubjectSchoolClassDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubjectSchoolClassService);
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
