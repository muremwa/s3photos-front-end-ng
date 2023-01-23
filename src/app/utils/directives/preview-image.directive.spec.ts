import {PreviewImageDirective} from './preview-image.directive';

describe('PreviewImageDirective', () => {
    it('should create an instance', () => {
        const directive = new PreviewImageDirective();
        expect(directive).toBeTruthy();
    });

    it('should set and listen', () => {
        const directive = new PreviewImageDirective();
        directive.previewSelectedImage = [
            document.createElement('div'),
            document.createElement('img')
        ];
        expect(directive.reader.readyState).toEqual(0);

        const fileInput = document.createElement('input');
        Object.defineProperty(fileInput, 'files', {
            writable: false,
            value: [ new File([new Blob()], 'name.jpg') ]
        });
        directive.onSelectFile(fileInput);
        expect(directive.reader.readyState).toEqual(1);
    });
});
