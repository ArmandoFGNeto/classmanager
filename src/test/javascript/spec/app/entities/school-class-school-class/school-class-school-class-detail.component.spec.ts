import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ClassmanagerTestModule } from '../../../test.module';
import { SchoolClassSchoolClassDetailComponent } from 'app/entities/school-class-school-class/school-class-school-class-detail.component';
import { SchoolClassSchoolClass } from 'app/shared/model/school-class-school-class.model';

describe('Component Tests', () => {
  describe('SchoolClassSchoolClass Management Detail Component', () => {
    let comp: SchoolClassSchoolClassDetailComponent;
    let fixture: ComponentFixture<SchoolClassSchoolClassDetailComponent>;
    const route = ({ data: of({ schoolClass: new SchoolClassSchoolClass(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ClassmanagerTestModule],
        declarations: [SchoolClassSchoolClassDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SchoolClassSchoolClassDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SchoolClassSchoolClassDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.schoolClass).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
