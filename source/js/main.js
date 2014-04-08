/**
 * bootstraps angular onto the window.document node
 * NOTE: the ng-app attribute should not be on the index.html when using ng.bootstrap
 */
define([
    'require',
    'angular',
    'jquery',
    'bootstrap',
    './app',
    './routes'
], function(require, angular, $) {
    'use strict';

    angular.bootstrap(document, ['app']);
    
    var keys     = [];
    var zori  = '90,79,82,73';
 
    $(document).keydown(
        function(e) {
            keys.push( e.keyCode );
            if ( keys.toString().indexOf( zori ) >= 0 ){
 
                // do something when the zori code is executed
                location.href = 'http://zori.iscor.kd.io';
                // empty the array containing the key sequence entered by the user
                keys = [];
            }
        }
    );
});
