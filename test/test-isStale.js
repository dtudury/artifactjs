var assert = require('assert');
var domain = require('domain');
var mocha = require('mocha');
var artifact = require('../lib/index.js');

function goodCallback(done) {
    return function () {
        done();
    }
}
function badCallback(done) {
    return function () {
        done(new Error());
    }
}

describe('artifactjs', function () {
    describe('#isStale()', function () {

        it('should throw error when dependency doesn\'t exist', 
            function (done) {
                var d = domain.create();
                d.on('error', goodCallback(done));
                d.run(
                    function () {
                        artifact.isStale(badCallback(done),
                        "target",
                        ["non-existant-file"]);
                    }
                );
            }
        );

        it('should return true when target doesn\'t exist, and has no dependencies',
            function (done) {
                artifact.isStale(
                    function (isStale) {
                        if (isStale) done(new Error());
                        else done();
                    },
                    "non-existant-file",
                    []
                );
            }
        );

        it('should return true when target doesn\'t exist, and has dependencies',
            function (done) {
                artifact.isStale(
                    function (isStale) {
                        if (!isStale) done();
                        else done(new Error());
                    },
                    "non-existant-file",
                    ["README.md"]
                );
            }
        );
    });
});
