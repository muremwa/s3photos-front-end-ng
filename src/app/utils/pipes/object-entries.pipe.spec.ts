import {ObjectEntriesPipe} from './object-entries.pipe';

describe('ObjectEntriesPipe', () => {
    it('create an instance', () => {
        const pipe = new ObjectEntriesPipe();
        expect(pipe).toBeTruthy();
    });

    it('should return a 3D array of entries', () => {
        const pipe = new ObjectEntriesPipe();
        expect(pipe.transform({
            name: 'chris',
            age: 20
        })).toEqual([
            ['name', 'chris'],
            ['age', 20]
        ]);
    })
});
