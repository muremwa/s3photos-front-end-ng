import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'objectEntries'
})
export class ObjectEntriesPipe implements PipeTransform {

    /**
     * Receives an object and returns an array of arrays of key and value pairs
     * { name: 'chris', age: 20 } => [ ['name', 'chris'], ['age', 20]]
     * */
    transform(value: { [index: string]: any }): Array<[string, any]> {
        return [...Object.entries(value)]
    }
}
