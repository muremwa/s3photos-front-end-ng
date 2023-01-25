import {TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {ProgressService} from "./utils/services/progress.service";

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [
                AppComponent
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const progress = TestBed.inject(ProgressService);
        const app = fixture.componentInstance;
        app.ngOnInit();
        progress.progressIndicator.next(50);
        expect(app).toBeTruthy();
    });
});
