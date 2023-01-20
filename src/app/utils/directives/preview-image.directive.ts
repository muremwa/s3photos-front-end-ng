import { Directive, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[previewSelectedImage]'
})
export class PreviewImageDirective {
    /**
     * Preview an image once a file is selected.
     * Receives an array with two elements, a div and an image element.
     * The div is the parent to the image.
     * */
    private reader = new FileReader();

    @Input() set previewSelectedImage (elements: [HTMLDivElement, HTMLImageElement]) {
        const [ parentDiv, previewElement ] = elements;

        this.reader.addEventListener('load', (event_) => {
            if (event_.target && event_.target.result) {
                previewElement.src = event_.target.result as string;
                parentDiv.style.display = 'block';
                parentDiv.scrollIntoView({ block: "center", behavior: "smooth" });
            }
        });
    }

    @HostListener('change', ['$event.target']) onSelectFile (input: HTMLInputElement) {
        console.log('here listening')
        if (input && input.files && input.files[0]) {
            this.reader.readAsDataURL(input.files[0])
        }
    }
}
