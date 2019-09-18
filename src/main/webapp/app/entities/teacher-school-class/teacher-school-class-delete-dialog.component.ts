import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITeacherSchoolClass } from 'app/shared/model/teacher-school-class.model';
import { TeacherSchoolClassService } from './teacher-school-class.service';

@Component({
  selector: 'jhi-teacher-school-class-delete-dialog',
  templateUrl: './teacher-school-class-delete-dialog.component.html'
})
export class TeacherSchoolClassDeleteDialogComponent {
  teacher: ITeacherSchoolClass;

  constructor(
    protected teacherService: TeacherSchoolClassService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.teacherService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'teacherListModification',
        content: 'Deleted an teacher'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-teacher-school-class-delete-popup',
  template: ''
})
export class TeacherSchoolClassDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ teacher }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TeacherSchoolClassDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.teacher = teacher;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/teacher-school-class', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/teacher-school-class', { outlets: { popup: null } }]);
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
