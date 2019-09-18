import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistorySchoolClass } from 'app/shared/model/history-school-class.model';
import { HistorySchoolClassService } from './history-school-class.service';

@Component({
  selector: 'jhi-history-school-class-delete-dialog',
  templateUrl: './history-school-class-delete-dialog.component.html'
})
export class HistorySchoolClassDeleteDialogComponent {
  history: IHistorySchoolClass;

  constructor(
    protected historyService: HistorySchoolClassService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.historyService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'historyListModification',
        content: 'Deleted an history'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-history-school-class-delete-popup',
  template: ''
})
export class HistorySchoolClassDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ history }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(HistorySchoolClassDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.history = history;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/history-school-class', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/history-school-class', { outlets: { popup: null } }]);
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
