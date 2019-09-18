import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStudentSchoolClass } from 'app/shared/model/student-school-class.model';
import { StudentSchoolClassService } from './student-school-class.service';

@Component({
  selector: 'jhi-student-school-class-delete-dialog',
  templateUrl: './student-school-class-delete-dialog.component.html'
})
export class StudentSchoolClassDeleteDialogComponent {
  student: IStudentSchoolClass;

  constructor(
    protected studentService: StudentSchoolClassService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.studentService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'studentListModification',
        content: 'Deleted an student'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-student-school-class-delete-popup',
  template: ''
})
export class StudentSchoolClassDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ student }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StudentSchoolClassDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.student = student;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/student-school-class', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/student-school-class', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
