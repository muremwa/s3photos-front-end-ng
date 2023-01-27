import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { of, throwError } from 'rxjs';

import { Cases, PhotosService } from './photos.service';


describe('PhotosService', () => {
    let service: PhotosService;
    let hSpy: jasmine.SpyObj<HttpClient>;
    const customErrorFactory = () => new HttpErrorResponse({ status: 500 });

    beforeEach(() => {
        hSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
        TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useValue: hSpy }
            ]
        });
        service = TestBed.inject(PhotosService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('#changeCase should change case correctly', () => {
        expect(service.changeCase(
            'my_name_is_muremwa',
            Cases.SNAKE_CASE,
            Cases.CAMEL_CASE
        )).toEqual('myNameIsMuremwa');

        expect(service.changeCase(
            'myNameIsMuremwa',
            Cases.CAMEL_CASE,
            Cases.SNAKE_CASE
        )).toEqual('my_name_is_muremwa');

        expect(() => service.changeCase('', '' as Cases, Cases.CAMEL_CASE)).toThrow()
        expect(() => service.changeCase('', Cases.SNAKE_CASE, '' as Cases)).toThrow()
    });

    it('#fetch posts and transform the output', (done) => {
        const sampleResponse = {
            posts: [{
                "id": 1,
                "liking_url": "/photos/like-actions/1/",
                "clean_time": "January 11, 2023, 09:30 AM",
                "uploaded_by": "Griffin X",
                "image_file": "/media/photos/IMG_20180628_122515_2.jpg",
                "caption": "Double",
                "likes": 0,
                "time": "2023-01-11T12:30:38.772560+03:00"
            }],
            liked: [1]
        };
        hSpy.get.and.returnValue(of(sampleResponse));

        [null, 'simple-query'].forEach((query) => {
            service.fetchPosts(query).subscribe({
                next: ({ success, posts }) => {
                    expect(success).toBeTrue();
                    expect(posts).toEqual([{
                        id: 1,
                        likingUrl: "/photos/like-actions/1/",
                        cleanTime: "January 11, 2023, 09:30 AM",
                        uploadedBy: "Griffin X",
                        imageFile: "/media/photos/IMG_20180628_122515_2.jpg",
                        caption: "Double",
                        likes: 0,
                        time: "2023-01-11T12:30:38.772560+03:00",
                        liked: true
                    }]);
                }
            });
        });

        hSpy.get.and.returnValue(throwError(customErrorFactory));

        service.fetchPosts(null).subscribe(({ success, posts }) => {
            expect(success).toBeFalse();
            expect(posts.length).toBe(0);
        })
        done();
    });

    it('#postReaction should return a response', (done) => {
        hSpy.post.and.returnValue(of({ "liked": false, "likes": 1 }));
        service.postReaction('').subscribe(({ success, likes, liked }) => {
            expect(success).toBeTrue()
            expect(likes).toEqual(1)
            expect(liked).toEqual(false)
        });

        hSpy.post.and.returnValue(throwError(customErrorFactory));
        service.postReaction('').subscribe(({ success, likes, liked }) => {
            expect(success).toBeFalse()
            expect(likes).toEqual(0)
            expect(liked).toEqual(false)
        });
        done();
    });

    it('#upload post', (done) => {
        //bad request
        const uploadErrorFactory = () => new HttpErrorResponse({ status: 400, error: { errors: {} } });
        hSpy.post.and.returnValue(throwError(uploadErrorFactory));
        service.uploadPost(new FormData()).subscribe(({ success, post }) => {
            expect(success).toBeFalse();
            expect(post).toEqual(null);
        });

        // good request
        const sampleResponsePost = {
            id: 1,
            likingUrl: "/photos/like-actions/1/",
            cleanTime: "January 11, 2023, 09:30 AM",
            uploadedBy: "Griffin X",
            imageFile: "/media/photos/IMG_20180628_122515_2.jpg",
            caption: "Double",
            likes: 0,
            time: "2023-01-11T12:30:38.772560+03:00",
            liked: true
        }
        hSpy.post.and.returnValue(of({ success: true, post: sampleResponsePost }));
        service.uploadPost(new FormData()).subscribe(({ success, post }) => {
            expect(success).toBeTrue();
            expect(post).toEqual(sampleResponsePost);
        });
        done();
    });

    it('should get the status of upload', (done) => {
        hSpy.get.and.returnValue(of(new HttpResponse({ status: 200 })));
        service.uploadPostStatus().subscribe((isAvailable) => expect(isAvailable).toBeTrue());

        hSpy.get.and.returnValue(of(new HttpResponse({ status: 400 })));
        service.uploadPostStatus().subscribe((isAvailable) => expect(isAvailable).toBeFalse());

        hSpy.get.and.returnValue(throwError(() => new HttpErrorResponse({ status: 500 })));
        service.uploadPostStatus().subscribe((isAvailable) => expect(isAvailable).toBeFalse());
        done();
    });
});
