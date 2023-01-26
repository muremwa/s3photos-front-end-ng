import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from "@angular/router";
import { Subject } from 'rxjs';

import { ErrorComponent } from './error.component';


const errorSubject = new Subject();
const mockActivatedRoute = {
    queryParams: errorSubject
};


describe('ErrorComponent', () => {
    let component: ErrorComponent;
    let fixture: ComponentFixture<ErrorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ErrorComponent],
            providers: [
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ErrorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create error component', () => {
        errorSubject.next({ error: 'simple' })
        expect(component).toBeTruthy();
        expect(component.errorReason).toEqual('simple');
    });

    it('should show unexpected error by default', () => {
        component.ngOnInit();
        errorSubject.next({})
        expect(component.errorReason).toEqual('Unexpected');
    });
});
