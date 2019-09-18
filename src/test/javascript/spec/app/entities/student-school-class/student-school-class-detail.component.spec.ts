import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClassmanagerTestModule } from '../../../test.module';
import { StudentSchoolClassDetailComponent } from 'app/entities/student-school-class/student-school-class-detail.component';
import { StudentSchoolClass } from 'app/shared/model/student-school-class.model';

describe('Component Tests', () => {
  describe('StudentSchoolClass Management Detail Component', () => {
    let comp: StudentSchoolClassDetailComponent;
    let fixture: ComponentFixture<StudentSchoolClassDetailComponent>;
    const route = ({ data: of({ student: new StudentSchoolClass(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [StudentSchoolClassDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StudentSchoolClassDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StudentSchoolClassDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.student).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
