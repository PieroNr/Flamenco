"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: only-arrow-functions
const chai_1 = require("chai");
const src_1 = require("../src");
describe('Index module', function () {
    describe('expected behavior', function () {
        it('should return hello world', function () {
            (0, chai_1.expect)((0, src_1.main)()).to.equal('Hello World');
        });
    });
});
//# sourceMappingURL=index.spec.js.map