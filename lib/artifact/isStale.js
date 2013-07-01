var fs = require('fs');
var async = require('async');
var throwy = require('./throwy');

module.exports = function isStale(staleCallback, target, deps) {
    async.parallel({
        depLastMod: function(parallelCallback) {
            async.map(deps, function(dep, callback) {
                fs.stat(dep, throwy(function(stat) {
                    callback(null, stat.mtime.getTime());
                }));
            }, throwy(function(stats) {
                parallelCallback(null, Math.max.apply(null, stats));
            }));
        },
        targetLastMod: function(parallelCallback) {
            fs.exists(target, throwy(function(exists) {
                if(exists) {
                    fs.stat(target, throwy(function(stat) {
                        parallelCallback(null, stat.mtime.getTime());
                    }));
                } else {
                    parallelCallback(null, 0);
                }
            }));
        }
    }, throwy(function(results) {
        console.log("results");
        console.log(results);
        staleCallback(results.depLastMod > results.targetLastMod);
    }));
};

