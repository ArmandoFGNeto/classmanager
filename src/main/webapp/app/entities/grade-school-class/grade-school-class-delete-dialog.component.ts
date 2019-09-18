import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGradeSchoolClass } from 'app/shared/model/grade-school-class.model';
import { GradeSchoolClassService } from './grade-school-class.service';

@Component({
  selector: 'jhi-grade-school-class-delete-dialog',
  templateUrl: './grade-school-class-delete-dialog.component.html'
})
export class GradeSchoolClassDeleteDialogComponent {
  grade: IGradeSchoolClass;

  constructor(
    protected gradeService: GradeSchoolClassService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.gradeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'gradeListModification',
        content: 'Deleted an grade'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-grade-school-class-delete-popup',
  template: ''
})
export class GradeSchoolClassDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ grade }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(GradeSchoolClassDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.grade = grade;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/grade-school-class', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/grade-school-class', { outlets: { popup: null } }]);
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
