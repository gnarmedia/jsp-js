const Renderer = require('../../lib/renderer');
const JspLib = require('../../lib/tags/jsplib');

const renderer = new Renderer({});
const tagLib = new JspLib({}, renderer);

describe('class JspLib', () => {
    describe('constructor()', () => {
        describe('this.tagMap', () => {
            it('should have a body property that calls tagBody()', () => {
                const tagLibMock = new JspLib({}, renderer);

                tagLibMock.tagBody = jest.fn();

                tagLibMock.tagMap.body();

                expect(tagLibMock.tagBody).toBeCalled();
            });

            it('should have a doBody property that calls doBody()', () => {
                const tagLibMock = new JspLib({}, renderer);

                tagLibMock.tagDoBody = jest.fn();

                tagLibMock.tagMap.doBody({});

                expect(tagLibMock.tagDoBody).toBeCalled();
            });

            it('should have a attribute property that calls doBody()', () => {
                const tagLibMock = new JspLib({}, renderer);

                tagLibMock.tagAttribute = jest.fn();

                tagLibMock.tagMap.attribute({});

                expect(tagLibMock.tagAttribute).toBeCalled();
            });

            it('should have a invoke property that calls doBody()', () => {
                const tagLibMock = new JspLib({}, renderer);

                tagLibMock.tagInvoke = jest.fn();

                tagLibMock.tagMap.invoke({});

                expect(tagLibMock.tagInvoke).toBeCalled();
            });
        });
    });

    describe('getData()', () => {
        it('should return the key\'s value', () => {
            const data = {
                testKey: 'test'
            };
            const result = tagLib.getData(data, 'testKey', 'fallback');

            expect(result).toEqual('test');
        });

        it('should return the fallback', () => {
            const result = tagLib.getData({}, 'notKey', 'fallback');

            expect(result).toEqual('fallback');
        });
    });

    describe('tagBody()', () => {
        it('should render the <jsp:body> tag with its content', () => {
            const node = {
                type: 'tag',
                token: {
                    name: 'jsp:body',
                    type: 'tag',
                    text: '<jsp:body>'
                },
                children: [
                    {
                        type: 'text',
                        token: {
                            type: 'text',
                            text: 'foobar'
                        }
                    }
                ]
            };
            const result = tagLib.tagBody(node, 1, {});

            expect(result.data.jspBody).toEqual('foobar');
        });
    });

    describe('tagDoBody()', () => {
        it('should return the body content and remove the jspBody node', () => {
            const node = {
                type: 'tag',
                token: {
                    name: 'jsp:doBody',
                    type: 'tag',
                    text: '<jsp:doBody />',
                    isClosed: true
                }
            };
            const result = tagLib.tagDoBody(node, 1, {jspBody: 'foobar'});

            expect(result.content).toEqual('foobar');
            expect(typeof result.data.jspBody).toEqual('undefined');
        });
    });

    describe('tagAttribute()', () => {
        it('should set the test attribute in the data', () => {
            const node = {
                type: 'tag',
                token: {
                    name: 'jsp:attribute',
                    type: 'tag',
                    params: {name: 'testAttr'},
                    text: '<jsp:attribute name="testAttr">'
                },
                children: [
                    {
                        type: 'text',
                        token: {
                            type: 'text',
                            text: 'foobar'
                        }
                    }
                ]
            };
            const result = tagLib.tagAttribute(node, 1, {});

            expect(result.data.testAttr).toEqual('foobar');
        });
    });

    describe('tagInvoke()', () => {
        it('should invoke the defined attributes', () => {
            const node = {
                type: 'tag',
                token: {
                    name: 'jsp:invoke',
                    type: 'tag',
                    params: {fragment: 'testAttr'},
                    text: '<jsp:invoke fragment="testAttr" />'
                }
            };
            const result = tagLib.tagInvoke(node, 1, {testAttr: 'foobar'});

            expect(result).toEqual('foobar');
        });
    });
});
