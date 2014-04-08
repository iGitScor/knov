/**
 * defines constants for application
 */
define(['angular'], function(ng) {
    'use strict';

    return ng.module('app.constants', [])
        .constant('CONFIG', {})
        .constant('FB_URL', 'https://scorching-fire-6383.firebaseio.com/knov/');
});
