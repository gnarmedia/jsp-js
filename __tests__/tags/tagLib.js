const Renderer = require('../../lib/renderer');
const TagLib = require('../../lib/tags/tagLib');

const renderer = new Renderer({});
const tagLib = new TagLib({}, renderer);

describe('class TagLib', () => {
    describe('cleanTestText()', () => {
        it('should clear the ${} from a code expression', () => {
            const testText = '${success && otherSuccess || otherValue > 5}';
            const cleanedText = 'success && otherSuccess || otherValue > 5';

            expect(tagLib.cleanTestText(testText)).toEqual(cleanedText);
        });
        it('should return the already clean expression', () => {
            const cleanedText = 'success && otherSuccess || otherValue > 5';

            expect(tagLib.cleanTestText(cleanedText)).toEqual(cleanedText);
        });
    });

    describe('supports()', () => {
        it('should return false for tag not in tagMap', () => {
            expect(tagLib.supports('not found')).toEqual(false);
        });
        it('should return true for tag in tagMap', () => {
            const mockedTagLib = tagLib;

            mockedTagLib.tagMap = {
                'test': () => true
            };

            expect(mockedTagLib.supports('test')).toEqual(true);
        });
    });

    describe('handle()', () => {
        it('should throw an error when the tag is unhandled', () => {
            expect(() => tagLib.handle('madeUpTag')).toThrow('Unhandled tag "madeUpTag"');
        });
        it('should handle the tag according to the tagMap', () => {
            const mockedTagLib = tagLib;

            mockedTagLib.tagMap = {
                'test': jest.fn()
            };

            tagLib.handle('test', 'node', 'index', 'data');

            expect(tagLib.tagMap.test).toHaveBeenCalledTimes(1);
            expect(tagLib.tagMap.test).toHaveBeenCalledWith('node', 'index', 'data');
        });
    });

    describe('wrapReturn()', () => {
        it('should wrap the returned content in an object', () => {
            expect(tagLib.wrapReturn('content', 'data')).toEqual({content: 'content', data: 'data'});
        });
    });
});
