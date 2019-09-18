import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClassmanagerTestModule } from '../../../test.module';
import { HistorySchoolClassDetailComponent } from 'app/entities/history-school-class/history-school-class-detail.component';
import { HistorySchoolClass } from 'app/shared/model/history-school-class.model';

describe('Component Tests', () => {
  describe('HistorySchoolClass Management Detail Component', () => {
    let comp: HistorySchoolClassDetailComponent;
    let fixture: ComponentFixture<HistorySchoolClassDetailComponent>;
    const route = ({ data: of({ history: new HistorySchoolClass(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [HistorySchoolClassDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(HistorySchoolClassDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(HistorySchoolClassDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.history).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
