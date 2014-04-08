define([
    './module',
    'jquery',
    'text!./word.html'
], function(directives, $, wordTpl) {
    'use strict';

    directives.directive('knovWord', ['$interval',
        function($interval) {
            function word(scope, element, attrs) {
                var timeoutId;
                var $word = $(element).find('a');

                function update() {
                }

                scope.$watch(attrs.myCurrentTime, function(value) {
                    update();
                });

                element.on('$destroy', function() {
                    $interval.cancel(timeoutId);
                });

                timeoutId = $interval(function() {
                    update();
                }, 1000);
            }
            
            return {
                restrict: 'A',
                template: wordTpl,
                word: word
            };
        }
    ]);
});
