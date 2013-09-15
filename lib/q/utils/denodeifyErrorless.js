/**
 * Created with IntelliJ IDEA.
 * User: davidtudury
 * Date: 9/14/13
 * Time: 2:05 PM
 */


var Q = require('q');


module.exports = denodeifyErrorless;


function denodeifyErrorless(f) {
    var args = [].slice.call(arguments, 1);
    return function () {
        var deferred = Q.defer();
        f.apply(void 0, args.concat([].slice.call(arguments), deferred.resolve));
        return deferred.promise;
    }
}