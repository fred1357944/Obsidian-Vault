/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class Processor {
    constructor(topLevelElement) {
        this.topLevelElement = topLevelElement;
    }
    static parse(el) {
        return new Processor(el).recurseAndParseElements(el);
    }
    /**
     * Traverses an elements child nodes and returns the text content.
     * @param el HTML element to get text nodes of.
     * @returns Top level text of the element.
     */
    getTopLevelText(el) {
        const texts = [];
        for (let child of Array.from(el.childNodes)) {
            if (child.nodeType == Node.TEXT_NODE) {
                texts.push(child.data);
            }
        }
        return texts.join("");
    }
    /**
     * Parse a string and return the [key, value] attribute pairs.
     * @param str String to pull attributes from.
     * @returns {[string, string]} Array of [key, value] attribute pairs.
     */
    getAttrs(str) {
        const trys = (str !== null && str !== void 0 ? str : "")
            // Split the string at spaces that are *not* between quotes.
            .split(/\s(?=(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*$)/)
            // Trim the resulting strings.
            .map((t) => t && t.trim())
            // Remove any strings that are undefined, zero length, or just a quote character.
            .filter((t) => t && t !== '"' && t !== "'" && t.length);
        if (!trys || !trys.length)
            return;
        // These characters are not allowed to be inside an attribute key.
        const allowedKeyChars = /[^\t\n\f />"'=]/;
        // {: data=value }
        const keySeparator = "=";
        // { .class }
        const classChar = ".";
        // { #id }
        // currently not allowed due to Obsidian tag
        // TODO: Figure out a workaround.
        /* const idChar = "#"; */
        const attrs = [];
        for (let pair of trys) {
            if (!pair || !pair.length)
                continue;
            //#id
            /* if (pair.charAt(0) === idChar) {
                attrs.push(["id", pair.slice(1)]);
                continue;
            } */
            // .class
            if (pair.charAt(0) === classChar) {
                attrs.push(["class", pair.slice(1)]);
                continue;
            }
            // data=value
            if (new RegExp(keySeparator).test(pair) &&
                allowedKeyChars.test(pair.slice(0, pair.indexOf(keySeparator)))) {
                attrs.push([...pair.split(keySeparator, 2)]);
                continue;
            }
            // checked
            attrs.push([pair, null]);
        }
        return attrs;
    }
    /**
     *
     * @param el HTML element to parse.
     * @returns {ElementWithAttributes} Element, attributes to apply, original matched text.
     */
    recurseAndParseElements(el) {
        var _a, _b, _c;
        const elements = [];
        // Text content of this node and *not* the children.
        const text = this.getTopLevelText(el);
        if (Processor.BLOCK_RE.test(text)) {
            // Attributes should apply to the whole block.
            let element = el;
            if (el instanceof HTMLLIElement) {
                // Need to apply attributes to containing UL if HTMLLIElement has a block attribute
                element = el.parentElement;
            }
            let [original, attribute_string] = (_a = text.match(Processor.BLOCK_RE)) !== null && _a !== void 0 ? _a : [];
            elements.push({
                element: element,
                attributes: this.getAttrs(attribute_string),
                text: attribute_string
            });
            el.innerHTML = el.innerHTML.replace(original, "");
            //rerun parser if LI element to get inlines
            if (el instanceof HTMLLIElement) {
                elements.push(...this.recurseAndParseElements(el));
            }
        }
        else if (Processor.BASE_RE.test(text)) {
            // Attributes are inline.
            // Get the text nodes that contains the attribute string.
            let textNode = Array.from(el.childNodes).find((node) => node.nodeType == Node.TEXT_NODE &&
                Processor.BASE_RE.test(text));
            // Find the HTML element that is the previous sibling of the text node.
            // textNode.previousSibling could return another text node.
            // previousElementSibling does not existing on a text node.
            let sibling = (_b = Array.from(el.children).find((node) => node.nextSibling == textNode)) !== null && _b !== void 0 ? _b : el;
            // Collapsible elements are a special case due to the collapse handle.
            if (sibling && sibling.hasClass("collapse-indicator")) {
                sibling = sibling.parentElement;
            }
            if (sibling && sibling instanceof HTMLBRElement) {
                sibling = sibling.parentElement;
            }
            // Parse out the attribute string.
            let [original, attribute_string] = (_c = text.match(Processor.BASE_RE)) !== null && _c !== void 0 ? _c : [];
            elements.push({
                element: sibling,
                attributes: this.getAttrs(attribute_string),
                text: attribute_string
            });
            // Remove the original attribute string from the text content.
            textNode.textContent = textNode.textContent.replace(original, "");
        }
        // Recursively find all attributes from the children of this element.
        for (let child of Array.from(el.children)) {
            if (!(child instanceof HTMLElement))
                continue;
            if (child instanceof HTMLPreElement || child.tagName.toLowerCase() === "code")
                continue;
            elements.push(...this.recurseAndParseElements(child));
        }
        return elements;
    }
}
Processor.BASE_RE = /\{\:?[ ]*([^\}\n ][^\}\n]*)[ ]*\}/;
Processor.ONLY_RE = /^\{\:?[ ]*([^\}\n ][^\}\n]*)[ ]*\}$/;
Processor.BLOCK_RE = /\n[ ]*\{\:?[ ]*([^\}\n ][^\}\n]*)[ ]*\}[ ]*$/;

class MarkdownAttributes extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.parsing = new Map();
    }
    onload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Markdown Attributes v${this.manifest.version} loaded.`);
            this.registerMarkdownPostProcessor(this.postprocessor.bind(this));
        });
    }
    postprocessor(topElement, ctx) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const child = topElement.firstElementChild;
            if (!child)
                return;
            let str;
            /** Code blocks have to be handled separately because Obsidian does not
             *  include any text past the language.
             *
             *  Unfortunately this also means that changes to the code block attributes
             *  require reloading the note to take effect because they do not trigger the postprocessor.
             */
            if (child instanceof HTMLPreElement) {
                /** If getSectionInfo returns null, stop processing. */
                if (!ctx.getSectionInfo(topElement))
                    return;
                /** Pull the Section data. */
                const { text, lineStart, lineEnd } = ctx.getSectionInfo(topElement);
                /** Get the source for this element. */
                let source = text.split("\n").slice(lineStart, lineEnd + 1);
                str = source.join("\n");
                /** Test if the element contains attributes. */
                if (!Processor.BASE_RE.test(str))
                    return;
                /** Pull the matched string and add it to the child so the Processor catches it. */
                let [attribute_string] = (_a = str.match(Processor.BASE_RE)) !== null && _a !== void 0 ? _a : [];
                child.prepend(new Text(attribute_string));
            }
            /**
             * Table elements should check the next line in the source to see if it is a single block attribute,
             * because those block attributes are not applied to the table.
             */
            if (child instanceof HTMLTableElement) {
                if (!ctx.getSectionInfo(topElement))
                    return;
                /** Pull the Section data. */
                const { text, lineEnd } = ctx.getSectionInfo(topElement);
                /** Get the source for this element. */
                let source = ((_b = text.split("\n").slice(lineEnd + 1, lineEnd + 2)) !== null && _b !== void 0 ? _b : []).shift();
                /** Test if the element contains attributes. */
                if (source &&
                    source.length &&
                    Processor.ONLY_RE.test(source.trim())) {
                    /** Pull the matched string and add it to the child so the Processor catches it. */
                    let [attribute_string] = (_c = source.match(Processor.ONLY_RE)) !== null && _c !== void 0 ? _c : [];
                    child.prepend(new Text(attribute_string));
                    str = topElement.innerText;
                }
            }
            /**
             * If the element is a <p> and the text is *only* an attribute, it was used as a block attribute
             * and should be removed.
             */
            if (child instanceof HTMLParagraphElement) {
                if (Processor.ONLY_RE.test(child.innerText.trim())) {
                    child.detach();
                    return;
                }
            }
            /** Test if the element contains attributes. */
            if (!Processor.BASE_RE.test(str !== null && str !== void 0 ? str : topElement.innerText))
                return;
            /** Parse the element using the Processor. */
            if (!(child instanceof HTMLElement))
                return;
            let elements = Processor.parse(child);
            /** If the processor did not find any attributes, return. */
            if (!elements || !elements.length)
                return;
            /** Add the attributes to the elements returned from the processor. */
            for (let { element, attributes } of elements) {
                if (!element || !attributes || !attributes.length)
                    continue;
                for (let [key, value] of attributes) {
                    if (!key)
                        continue;
                    if (value)
                        value = value.replace(/("|')/g, "");
                    if (key === "class") {
                        element.addClasses(value.split(" "));
                    }
                    else if (!value) {
                        element.setAttr(key, true);
                    }
                    else {
                        element.setAttr(key, value);
                    }
                }
            }
        });
    }
    onunload() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Markdown Attributes unloaded");
        });
    }
}

module.exports = MarkdownAttributes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsInNyYy9wcm9jZXNzb3IudHMiLCJzcmMvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6bnVsbCwibmFtZXMiOlsiUGx1Z2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBdURBO0FBQ08sU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFO0FBQzdELElBQUksU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsT0FBTyxLQUFLLFlBQVksQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxVQUFVLE9BQU8sRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0FBQ2hILElBQUksT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxPQUFPLEVBQUUsTUFBTSxFQUFFO0FBQy9ELFFBQVEsU0FBUyxTQUFTLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUNuRyxRQUFRLFNBQVMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtBQUN0RyxRQUFRLFNBQVMsSUFB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
