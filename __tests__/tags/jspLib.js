const Renderer = require('../../lib/renderer');
const JspLib = require('../../lib/tags/jspLib');

const renderer = new Renderer({});
const jspLib = new JspLib({}, renderer);

describe('class JspLib', () => {
    describe('constructor()', () => {
        describe('this.tagMap', () => {
            it('should have a body property that calls tagBody()', () => {
                const jspLibMock = new JspLib({}, renderer);

                jspLibMock.tagBody = jest.fn();
                jspLibMock.tagMap.body();

                expect(jspLibMock.tagBody).toBeCalled();
            });

            it('should have a doBody property that calls doBody()', () => {
                const jspLibMock = new JspLib({}, renderer);

                jspLibMock.tagDoBody = jest.fn();
                jspLibMock.tagMap.doBody({});

                expect(jspLibMock.tagDoBody).toBeCalled();
            });

            it('should have a attribute property that calls doBody()', () => {
                const jspLibMock = new JspLib({}, renderer);

                jspLibMock.tagAttribute = jest.fn();
                jspLibMock.tagMap.attribute({});

                expect(jspLibMock.tagAttribute).toBeCalled();
            });

            it('should have a invoke property that calls doBody()', () => {
                const jspLibMock = new JspLib({}, renderer);

                jspLibMock.tagInvoke = jest.fn();
                jspLibMock.tagMap.invoke({});

                expect(jspLibMock.tagInvoke).toBeCalled();
            });
        });
    });

    describe('getData()', () => {
        it('should return the key\'s value', () => {
            const data = {
                testKey: 'test'
            };
            const result = jspLib.getData(data, 'testKey', 'fallback');

            expect(result).toEqual('test');
        });

        it('should return the fallback', () => {
            const result = jspLib.getData({}, 'notKey', 'fallback');

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
            const result = jspLib.tagBody(node, 1, {});

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
            const result = jspLib.tagDoBody(node, 1, {jspBody: 'foobar'});

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
            const result = jspLib.tagAttribute(node, 1, {});

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
            const result = jspLib.tagInvoke(node, 1, {testAttr: 'foobar'});

            expect(result).toEqual('foobar');
        });
    });
});
