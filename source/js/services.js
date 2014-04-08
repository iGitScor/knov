/**
 * Attach services to this module
 **/
define([
    'angular',
    'firebase',
    'angularfire',
    './config'
], function(ng, Firebase, conf) {
    'use strict';

    return ng.module('app.services', ['app.constants', 'firebase'])
        .factory('exampleStorage', function() {
            var STORAGE_ID = 'knov-word';

            return {
                get: function() {
                    return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
                },

                put: function(links) {
                    localStorage.setItem(STORAGE_ID, JSON.stringify(links));
                }
            };
        })
        .factory('fireRef', ['$firebase', 'FB_URL',
            function($firebase, FB_URL) {
                return {
                    words: function() {
                        return $firebase(new Firebase(FB_URL + 'words'));
                    }
                };
            }
        ]);
});
