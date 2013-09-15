/**
 * User: davidtudury
 */


var fs = require('../q/fs');
var path = require('path');
var paths = require('./utils/paths');


module.exports = mkdir;


function mkdir(dir) {
    dir = path.relative(process.cwd(), dir);
    var parents = paths.parents(dir);
    return makeParents(parents);
}


function makeParents(parents) {
    if (!parents.length) return null;
    var parent = parents.shift();
    return fs.exists(parent)
        .then(function (exists) {
            if (exists) return null;
            return fs.mkdir(parent);
        })
        .thenResolve(makeParents).fcall(parents);
}
