import {TestBed} from '@angular/core/testing';

import {Cases, PhotosService} from './photos.service';


describe('PhotosService', () => {
    let service: PhotosService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PhotosService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('#changeCase should change case correctly', () => {
        expect(service.changeCase(
            'my_name_is_muremwa',
            Cases.SNAKE_CASE,
            Cases.HUNGARIAN_NOTATION
        )).toEqual('myNameIsMuremwa');

        expect(service.changeCase(
            'myNameIsMuremwa',
            Cases.HUNGARIAN_NOTATION,
            Cases.SNAKE_CASE
        )).toEqual('my_name_is_muremwa')
    });
});
