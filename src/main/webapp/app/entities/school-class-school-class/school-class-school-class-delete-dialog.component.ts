import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';
import { SchoolClassSchoolClassService } from './school-class-school-class.service';

@Component({
  selector: 'jhi-school-class-school-class-delete-dialog',
  templateUrl: './school-class-school-class-delete-dialog.component.html'
})
export class SchoolClassSchoolClassDeleteDialogComponent {
  schoolClass: ISchoolClassSchoolClass;

  constructor(
    protected schoolClassService: SchoolClassSchoolClassService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.schoolClassService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'schoolClassListModification',
        content: 'Deleted an schoolClass'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-school-class-school-class-delete-popup',
  template: ''
})
export class SchoolClassSchoolClassDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ schoolClass }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SchoolClassSchoolClassDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.schoolClass = schoolClass;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/school-class-school-class', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/school-class-school-class', { outlets: { popup: null } }]);
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
