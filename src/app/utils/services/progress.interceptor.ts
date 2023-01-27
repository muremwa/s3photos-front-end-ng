import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ProgressService } from "./progress.service";


@Injectable()
export class ProgressInterceptor implements HttpInterceptor {

    constructor(private progressService: ProgressService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(
            request.clone({ reportProgress: true })
        ).pipe(tap((event) => {
            switch (event.type) {
                case HttpEventType.UploadProgress:
                    const value = event.total? event.loaded / event.total: 70;
                    this.progressService.progressIndicator.next(value);
                    break;

                case HttpEventType.ResponseHeader:
                    this.progressService.progressIndicator.next(event.ok? 95: 0);
                    break;

                case HttpEventType.Response:
                    this.progressService.progressIndicator.next(100);
                    setTimeout(() => this.progressService.progressIndicator.next(0), 200)
                    break;

                default:
                    break;
            }
        }))
    }
}
