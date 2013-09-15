/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/14/13
 * Time: 3:48 PM
 */


var _ = require('lodash');
var fs = require('../q/fs');
var Q = require('q');


module.exports = dependencyMap;


function dependencyMap(targets, components) {
    targets = _.isArray(targets) ? _.clone(targets) : targets === undefined ? [] : [targets];
    components = _.isArray(components) ? _.clone(components) : components === undefined ? [] : [components];
    this.isStale = function () {
        if (!targets.length || !components.length) return Q(true);
        return Q.all(_.map(targets, function (target) {
                return fs.exists(target);
            })).then(_.every)
            .then(function (allTargetsExist) {
                if (!allTargetsExist) return true;
                return Q
                    .all(_.map(components, function (component) {
                        return fs.exists(component);
                    })).then(_.every)
                    .then(function (allComponentsExist) {
                        if (!allComponentsExist) return true;
                        return Q
                            .all([
                                Q.all(_.map(targets, function (target) {
                                    return fs.stat(target);
                                })),
                                Q.all(_.map(components, function (component) {
                                    return fs.stat(component);
                                }))
                            ])
                            .spread(function (targetStats, componentStats) {
                                var oldestTargetMTime = _.min(_.pluck(targetStats, 'mtime').map(function (mtime) {
                                    return new Date(mtime);
                                }));
                                var newestComponetMTime = _.max(_.pluck(componentStats, 'mtime').map(function (mtime) {
                                    return new Date(mtime);
                                }));
                                return oldestTargetMTime < newestComponetMTime;
                            });
                    })
            })
    };
}