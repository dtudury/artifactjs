module.exports = function throwy(errorAgnostic) {
    return function(error, value) {
        if(error) throw error;
        errorAgnostic(value);
    }
}
