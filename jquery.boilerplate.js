/*
 *  Project:
 *  Description:
 *  Author:
 *  License:
 */

// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ($, window, document, undefined) {

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'defaultPluginName';
    var defaults = {
        propertyName: 'value'
    };

    // The actual plugin constructor
    var Plugin = function (element, options) {
        this.element = element;
        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    };

    Plugin.prototype = {
        init: function () {
            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.options
            // you can add more functions like the one below and
            // call them like so: this.yourOtherFunction(this.element, this.options).
        },
        // Set an option after initialization
        option: function (options) {
            if (typeof options === 'string') {
                if (aguments.length = 1) {
                    return this.options[options];
                } else {
                    options = {};
                    options[aguments[0]] = aguments[1];
                }
            }
            $.extend(this.options, options);
        },
        yourOtherFunction: function () {
            // some logic
        }
    };
    
    // A not so lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations and allowing other methods on
    // the obect to be called after initialization.
    $.fn[pluginName] = function (options) {
        if (options === 'init') {
            options = Array.prototype.slice.call(arguments, 1);
        }
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_') {
            return this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    instance[options].apply(instance, Array.prototype.slice.call(arguments, 1));
                }
            });
        }
    };
    
    // Make the defaults globally configurable
    $.fn[pluginName].defaults = defaults;

})(jQuery, window, document);
