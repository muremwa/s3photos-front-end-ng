import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {of, Subject} from "rxjs";

import {HomeComponent} from './home.component';
import {PhotosService} from "../../utils/services/photos.service";
import {IPost} from "../../types/ipost";

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let photoSpy: jasmine.SpyObj<PhotosService>;
    const posts: Array<IPost> = [{
        id: 1,
        likingUrl: "/photos/like-actions/1/",
        cleanTime: "January 11, 2023, 09:30 AM",
        uploadedBy: "Griffin X",
        imageFile: "/media/photos/IMG_20180628_122515_2.jpg",
        caption: "Double",
        likes: 5,
        time: "2023-01-11T12:30:38.772560+03:00",
        liked: false
    }]

    beforeEach(async () => {
        photoSpy = jasmine.createSpyObj('PhotosService', [
            'fetchPosts', 'postReaction', 'uploadPost'
        ], {
            postQuery: new Subject<string>(),
        });
        photoSpy.fetchPosts.and.returnValue(of({ success: true, posts }))
        await TestBed.configureTestingModule({
            declarations: [HomeComponent],
            providers: [
                { provide: PhotosService, useValue: photoSpy },
            ],
            imports: [RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create & fetch posts', () => {
        expect(component).toBeTruthy();
        component.photoService.postQuery.next('sample1');
        component.ngOnInit();
        component.photoService.postQuery.next('sample2');
        expect(component.postQuerySubscription).toBeTruthy();
        expect(component.postQuery).toEqual('sample2');
        expect(component.posts).toEqual(posts);
        expect(component.postLoadingError).toBeFalse();
    });

    it('should fail fetching posts', () => {
        expect(component.postLoadingError).toBeFalsy();
        photoSpy.fetchPosts.and.returnValue(of({ success: false, posts: [] }));
        component.ngOnInit();
        expect(component.postLoadingError).toBeTrue();
    });

    it('should react to posts', () => {
        const post = component.posts[0];
        const expectedLikeStatus = {
            liked: !post.liked,
            likes: post.liked? --post.likes: ++post.likes
        };
        photoSpy.postReaction.and.returnValue(of({ success: true, ...expectedLikeStatus }));
        component.ngOnInit();
        component.reactToPost(post.likingUrl, post.id);
        expect(component.posts[0].liked).toEqual(expectedLikeStatus.liked);
        expect(component.posts[0].likes).toEqual(expectedLikeStatus.likes);
    });
});
