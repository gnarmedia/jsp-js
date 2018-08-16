const Renderer = require('../renderer');
const utils = require('../utils');

class TagLib {
    /**
     * Abstracts a library of JSP tags.
     * @param {object} options
     * @param {Renderer} renderer
     */
    constructor(options, renderer) {
        this.tagMap = {};
        this.options = options;
        this.renderer = renderer;
        this.utils = utils;
    }

    // TODO: might need rewriting to address multiple code blocks, but likely needs to be handled elsewhere.
    cleanCodeExpText(codeExp) {
        codeExp = codeExp.trim();
        if (codeExp.startsWith('${') && codeExp.endsWith('}')) {
            codeExp = codeExp.slice(2, -1);
        }
        return codeExp;
    }

    supports(tag) {
        return tag in this.tagMap;
    }

    handle(tag, node, index, data) {
        if (!this.supports(tag)) {
            throw new Error(`Unhandled tag "${tag}"`);
        }
        return this.tagMap[tag](node, index, data);
    }

    wrapReturn(content, data) {
        return {content: content, data: data};
    }
}

module.exports = TagLib;
