import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ClassmanagerTestModule } from '../../../test.module';
import { TeacherSchoolClassDeleteDialogComponent } from 'app/entities/teacher-school-class/teacher-school-class-delete-dialog.component';
import { TeacherSchoolClassService } from 'app/entities/teacher-school-class/teacher-school-class.service';

describe('Component Tests', () => {
  describe('TeacherSchoolClass Management Delete Component', () => {
    let comp: TeacherSchoolClassDeleteDialogComponent;
    let fixture: ComponentFixture<TeacherSchoolClassDeleteDialogComponent>;
    let service: TeacherSchoolClassService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [TeacherSchoolClassDeleteDialogComponent]
      })
        .overrideTemplate(TeacherSchoolClassDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TeacherSchoolClassDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TeacherSchoolClassService);
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
