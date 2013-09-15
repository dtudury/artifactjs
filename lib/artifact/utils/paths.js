/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/14/13
 * Time: 12:24 AM
 */


var path = require('path');


exports.expand = expand;
exports.parents = parents;


function expand(dir) {

}


function parents(dir) {
    var folders = dir.split(path.sep);
    var parents = [folders[0]];
    for (var i = 1; i < folders.length; i++) {
        parents.push(path.join(parents[i - 1], folders[i]));
    }
    return parents;
}