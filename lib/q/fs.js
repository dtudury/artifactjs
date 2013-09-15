/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/13/13
 * Time: 4:38 PM
 */


var fs = require('fs');
var Q = require('q');
var denodeifyErrorless = require('./utils/denodeifyErrorless');

var mkdir = Q.denodeify(fs.mkdir);


exports.exists = denodeifyErrorless(fs.exists);
exports.mkdir = loggify('mkdir:', Q.denodeify(fs.mkdir));
exports.rmdir = loggify('rmdir:', Q.denodeify(fs.rmdir));
exports.unlink = loggify('rm:', Q.denodeify(fs.unlink));
exports.readdir = Q.denodeify(fs.readdir);
exports.lstat = Q.denodeify(fs.lstat);
exports.stat = Q.denodeify(fs.stat);


function loggify(label, f) {
    return function() {
        var args = [].slice.apply(arguments);
        return f.apply(null, args).then(function() {
            args.unshift(label);
            log.apply(null, args);
        });
    }
}

function log() {
    console.log.apply(console, arguments);
}