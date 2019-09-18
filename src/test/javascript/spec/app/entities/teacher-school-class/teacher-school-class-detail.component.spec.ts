import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClassmanagerTestModule } from '../../../test.module';
import { TeacherSchoolClassDetailComponent } from 'app/entities/teacher-school-class/teacher-school-class-detail.component';
import { TeacherSchoolClass } from 'app/shared/model/teacher-school-class.model';

describe('Component Tests', () => {
  describe('TeacherSchoolClass Management Detail Component', () => {
    let comp: TeacherSchoolClassDetailComponent;
    let fixture: ComponentFixture<TeacherSchoolClassDetailComponent>;
    const route = ({ data: of({ teacher: new TeacherSchoolClass(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [TeacherSchoolClassDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(TeacherSchoolClassDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TeacherSchoolClassDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.teacher).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
