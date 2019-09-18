import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IHistorySchoolClass } from 'app/shared/model/history-school-class.model';

@Component({
  selector: 'jhi-history-school-class-detail',
  templateUrl: './history-school-class-detail.component.html'
})
export class HistorySchoolClassDetailComponent implements OnInit {
  history: IHistorySchoolClass;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ history }) => {
      this.history = history;
    });
  }

  previousState() {
    window.history.back();
  }
}
