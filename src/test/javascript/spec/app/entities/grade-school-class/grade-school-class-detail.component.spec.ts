import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClassmanagerTestModule } from '../../../test.module';
import { GradeSchoolClassDetailComponent } from 'app/entities/grade-school-class/grade-school-class-detail.component';
import { GradeSchoolClass } from 'app/shared/model/grade-school-class.model';

describe('Component Tests', () => {
  describe('GradeSchoolClass Management Detail Component', () => {
    let comp: GradeSchoolClassDetailComponent;
    let fixture: ComponentFixture<GradeSchoolClassDetailComponent>;
    const route = ({ data: of({ grade: new GradeSchoolClass(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [GradeSchoolClassDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(GradeSchoolClassDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GradeSchoolClassDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.grade).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
