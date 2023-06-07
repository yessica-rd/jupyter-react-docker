"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai = require("chai");
const debug_ext_1 = require("../../debug/debug-ext");
const expect = chai.expect;
describe('Debug API', () => {
    describe('#asDebugSourceURI', () => {
        const mockRPCProtocol = {
            getProxy(_proxyId) {
                return {};
            },
            set(_id, instance) {
                return instance;
            },
            dispose() {
                // Nothing
            }
        };
        const debug = new debug_ext_1.DebugExtImpl(mockRPCProtocol);
        it('should use sourceReference, path and sessionId', () => {
            const source = {
                sourceReference: 3,
                path: 'test/path'
            };
            const session = { id: 'test-session' };
            const uri = debug.asDebugSourceUri(source, session);
            expect(uri.toString(true)).to.be.equal('debug:test/path?ref=3&session=test-session');
        });
        it('should use sourceReference', () => {
            const source = {
                sourceReference: 5
            };
            const uri = debug.asDebugSourceUri(source);
            expect(uri.toString(true)).to.be.equal('debug:?ref=5');
        });
        it('should use sourceReference and session', () => {
            const source = {
                sourceReference: 5
            };
            const session = { id: 'test-session' };
            const uri = debug.asDebugSourceUri(source, session);
            expect(uri.toString(true)).to.be.equal('debug:?ref=5&session=test-session');
        });
        it('should use sourceReference and path', () => {
            const source = {
                sourceReference: 4,
                path: 'test/path'
            };
            const uri = debug.asDebugSourceUri(source);
            expect(uri.toString(true)).to.be.equal('debug:test/path?ref=4');
        });
        it('should use path', () => {
            const source = {
                path: 'scheme:/full/path'
            };
            const uri = debug.asDebugSourceUri(source);
            expect(uri.toString(true)).to.be.equal('scheme:/full/path');
        });
        it('should use file path', () => {
            const source = {
                path: '/full/path'
            };
            const uri = debug.asDebugSourceUri(source);
            expect(uri.toString(true)).to.be.equal('file:///full/path');
        });
    });
});
//# sourceMappingURL=debug.spec.js.map