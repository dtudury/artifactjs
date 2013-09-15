/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/14/13
 * Time: 2:30 PM
 */


var _ = require('lodash');
var fs = require('../q/fs');
var path = require('path');


module.exports = rm;


function rm(file) {
    return fs.exists(file)
        .then(function (exists) {
            if (!exists) return null;
            return fs.lstat(file)
                .then(function (stat) {
                    if (stat.isFile() || stat.isSymbolicLink()) {
                        return fs.unlink(file);
                    } else if (stat.isDirectory()) {
                        return rmdir(file);
                    }
                    throw new Error("don't know how to remove fifi, socket, device, etc.");
                })
        });
}


function rmdir(dir) {
    return fs.readdir(dir)
        .then(function (files) {
            return _.map(files, function (file) {
                return rm(path.join(dir, file));
            })
        })
        .all()
        .thenResolve(dir).then(fs.rmdir);
}