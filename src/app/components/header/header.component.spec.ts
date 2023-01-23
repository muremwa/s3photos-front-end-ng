import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HeaderComponent} from './header.component';
import {PhotosService} from "../../utils/services/photos.service";
import {Subject, firstValueFrom} from "rxjs";


describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let photoSpy: jasmine.SpyObj<PhotosService>;

    beforeEach(async () => {
        photoSpy = jasmine.createSpyObj('PhotosService', [], {
            postQuery: new Subject<string>(),
        });

        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            providers: [
                { provide: PhotosService, useValue: photoSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should listen to post query', (done) => {
        component.ngOnInit();
        photoSpy.postQuery.next('query');
        expect(component.postQuery).toEqual('query');
        done();
    });

    it('#queryPosts should navigate', (done) => {
        component.ngOnInit();
        const queryInput = document.createElement('input');
        queryInput.name = 'post-query';
        queryInput.value = 'Eureka';
        const form = document.createElement('form');
        form.appendChild(queryInput);
        const event = new SubmitEvent('submit');
        Object.defineProperty(event, 'target', { writable: false, value: form });
        component.queryPosts(event).then(() => {
            const routerParams = component.router.routerState.root.queryParams;
            return firstValueFrom(routerParams);
        }).then((value) => {
            expect(value).toEqual({ 'post-query': 'Eureka' })
            done();
        })
    })
});
