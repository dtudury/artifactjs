/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/12/13
 * Time: 8:37 PM
 */


var artifact = require('../lib/index');
var Q = require('q');


function log() {
    console.log.apply(console, arguments);
}


Q()
    .thenResolve('../temp/a/b/c').then(artifact.mkdir)
    .thenResolve('../temp/d/b/c').then(artifact.mkdir)
    .thenResolve('../temp/a/b/e').then(artifact.mkdir)
    .thenResolve('../temp/a/b/f').then(artifact.mkdir)

    .thenResolve('../temp').then(artifact.rm)

    .done();




var dm;

dm = new artifact.dependencyMap('copy.js', '../package.json');
dm.isStale().then(log);

dm = new artifact.dependencyMap('../package.json', 'copy.js');
dm.isStale().then(log);