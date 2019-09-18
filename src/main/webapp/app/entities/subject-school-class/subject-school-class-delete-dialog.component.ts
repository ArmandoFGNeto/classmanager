import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubjectSchoolClass } from 'app/shared/model/subject-school-class.model';
import { SubjectSchoolClassService } from './subject-school-class.service';

@Component({
  selector: 'jhi-subject-school-class-delete-dialog',
  templateUrl: './subject-school-class-delete-dialog.component.html'
})
export class SubjectSchoolClassDeleteDialogComponent {
  subject: ISubjectSchoolClass;

  constructor(
    protected subjectService: SubjectSchoolClassService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.subjectService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'subjectListModification',
        content: 'Deleted an subject'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-subject-school-class-delete-popup',
  template: ''
})
export class SubjectSchoolClassDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ subject }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SubjectSchoolClassDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.subject = subject;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/subject-school-class', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/subject-school-class', { outlets: { popup: null } }]);
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
