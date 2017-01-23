import { saveToLocalStorage, loadFromLocalStorage } from './data';

describe('Data', function() {
    it('Should save and load data', function() {
        const data = {
            hello: 'World',
            number: 563,
        }
        
        expect(saveToLocalStorage('data', data)).toEqual(true);
        expect(loadFromLocalStorage('data')).toEqual(data);
    });
});
