import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClassmanagerTestModule } from '../../../test.module';
import { SubjectSchoolClassDetailComponent } from 'app/entities/subject-school-class/subject-school-class-detail.component';
import { SubjectSchoolClass } from 'app/shared/model/subject-school-class.model';

describe('Component Tests', () => {
  describe('SubjectSchoolClass Management Detail Component', () => {
    let comp: SubjectSchoolClassDetailComponent;
    let fixture: ComponentFixture<SubjectSchoolClassDetailComponent>;
    const route = ({ data: of({ subject: new SubjectSchoolClass(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [SubjectSchoolClassDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SubjectSchoolClassDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubjectSchoolClassDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subject).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
