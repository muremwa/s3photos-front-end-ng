import { TestBed } from '@angular/core/testing';
import { HttpEventType, HttpHandler, HttpRequest } from "@angular/common/http";
import { of } from "rxjs";

import { ProgressInterceptor } from './progress.interceptor';
import { ProgressService } from "./progress.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";


describe('ProgressInterceptor', () => {
    let interceptor: ProgressInterceptor;
    let progress: ProgressService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                ProgressService,
                ProgressInterceptor,
            ]
        });
        progress = TestBed.inject(ProgressService);
    });

    it('should be created', (done) => {
        const sampleRequest = { clone: () => ({})};
        interceptor = TestBed.inject(ProgressInterceptor);
        expect(interceptor).toBeTruthy();
        let indicatorVal: number;
        progress.progressIndicator.subscribe((val) => indicatorVal = val);

        [
            { type: HttpEventType.Sent },
            { type: HttpEventType.UploadProgress, loaded: 40, total: 100, progress: 40/100 },
            { type: HttpEventType.UploadProgress, loaded: 40, progress: 70 },
            { type: HttpEventType.DownloadProgress, loaded: 40, total: 100, progress: 40/100 },
            { type: HttpEventType.DownloadProgress, loaded: 40, progress: 70 },
            { type: HttpEventType.ResponseHeader, progress: 95 },
            { type: HttpEventType.Response, progress: 100 },
        ].forEach((event) => {
            const sampleHandler = { handle: () => of(event)};

            interceptor.intercept(
                sampleRequest as HttpRequest<any>,
                sampleHandler as HttpHandler
            ).subscribe(() => {
                expect(indicatorVal).toEqual(event.progress!);

                if (event.type === HttpEventType.Response) {
                    jasmine.clock().install();
                    jasmine.clock().tick(100);
                }
            });
        });
        done();
    });
});
