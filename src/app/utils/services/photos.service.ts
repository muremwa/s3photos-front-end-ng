import { Injectable } from '@angular/core';


export enum Cases {
    SNAKE_CASE = 'sc',
    HUNGARIAN_NOTATION = 'hn'
}

@Injectable({
    providedIn: 'root'
})
export class PhotosService {

    changeCase(item: string, currentCase: Cases, newCase: Cases): string {
        let splitItem: Array<string> = [];
        let result: string;

        switch (currentCase) {
            case Cases.HUNGARIAN_NOTATION:
                splitItem = [...item.split(/([A-Z][a-z]*)/).filter(Boolean)]
                break;

            case Cases.SNAKE_CASE:
                splitItem = [...item.split('_')]
                break;

            default:
                throw new Error('Not supported');
        }

        switch (newCase) {
            case Cases.SNAKE_CASE:
                result = splitItem.map((str) => str.toLowerCase()).join('_');
                break;

            case Cases.HUNGARIAN_NOTATION:
                result = splitItem.map((str, index) => {
                    if (index > 0) {
                        return `${str.substring(0, 1).toUpperCase()}${str.substring(1).toLowerCase()}`
                    }
                    return str;
                }).join('');
                break;

            default:
                throw new Error('Not supported');
        }
        return result;
    };
}
