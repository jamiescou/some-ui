/*
 * @name JavaScript/NodeJS Merge v1.2.0
 * @author yeikos
 * @repository https://github.com/yeikos/js.merge

 * Copyright 2014 yeikos - MIT license
 * https://raw.github.com/yeikos/js.merge/master/LICENSE
 */
(function(isNode) {

    /**
     * Merge one or more objects
     * @param bool? clone
     * @param mixed,... arguments
     * @return object
     */

    let Public = function(clone) {

        return merge(clone === true, false, arguments);

    };
    let publicName = 'merge';

    /**
     * Merge two or more objects recursively
     * @param bool? clone
     * @param mixed,... arguments
     * @return object
     */

    Public.recursive = function(clone) {

        return merge(clone === true, true, arguments);

    };

    /**
     * Clone the input removing any reference
     * @param mixed input
     * @return mixed
     */

    Public.clone = function(input) {

        let output = input;
        let type = typeOf(input);
        let index;
        let size;

        if (type === 'array') {

            output = [];
            size = input.length;

            for (index = 0; index < size; ++index) {
                output[index] = Public.clone(input[index]);
            }

        } else if (type === 'object') {

            output = {};

            for (index in input) {
                output[index] = Public.clone(input[index]);
            }
        }

        return output;

    };

    /**
     * Merge two objects recursively
     * @param mixed input
     * @param mixed extend
     * @return mixed
     */

    function merge_recursive(base, extend) {
        if (typeOf(base) !== 'object') {
            return extend;
        }
        for (let key in extend) {
            if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {
                base[key] = merge_recursive(base[key], extend[key]);
            } else {
                base[key] = extend[key];
            }
        }
        return base;
    }

    /**
     * Merge two or more objects
     * @param bool clone
     * @param bool recursive
     * @param array argv
     * @return object
     */

    function merge(clone, recursive, argv) {
        let result = argv[0];
        let size = argv.length;
        if (clone || typeOf(result) !== 'object') {
            result = {};
        }
        for (let index = 0; index < size; ++index) {
            let item = argv[index];

            let type = typeOf(item);

            if (type !== 'object') {
                continue;
            }
            for (let key in item) {

                let sitem = clone ? Public.clone(item[key]) : item[key];

                if (recursive) {

                    result[key] = merge_recursive(result[key], sitem);

                } else {

                    result[key] = sitem;

                }

            }

        }

        return result;

    }

    /**
     * Get type of letiable
     * @param mixed input
     * @return string
     *
     * @see http://jsperf.com/typeoflet
     */

    function typeOf(input) {

        return ({}).toString.call(input).slice(8, -1).toLowerCase();

    }

    if (isNode) {

        module.exports = Public;

    } else {

        window[publicName] = Public;

    }

})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
