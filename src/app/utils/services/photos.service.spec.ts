import { TestBed } from '@angular/core/testing';

import { Cases, PhotosService } from './photos.service';
import { HttpClient } from "@angular/common/http";
import { of } from 'rxjs';


describe('PhotosService', () => {
    let service: PhotosService;
    let hSpy: jasmine.SpyObj<HttpClient>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('HttpClient', ['get']);
        TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useValue: spy }
            ]
        });
        service = TestBed.inject(PhotosService);
        hSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
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
        )).toEqual('my_name_is_muremwa')
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
        hSpy.get.and.returnValue(of(sampleResponse))

        service.fetchPosts().subscribe({
            next: (posts) => {
                console.log(posts)
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
                done();
            }
        });
    });
});
