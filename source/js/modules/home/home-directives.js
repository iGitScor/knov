define([
    './module',
    'jquery',
    'text!./word.html'
], function(directives, $, linkTpl) {
    'use strict';

    directives.directive('knovWord', ['$interval',
        function($interval) {
            function link(scope, element, attrs) {
                var timeoutId;
                var $link = $(element).find('a');

                function update() {
                    if (($link.attr('data-definition') == '?') && $.inArray($link.attr('data-word'), scope.nbNewWords) == -1) {
                        scope.nbNewWords.push($link.attr('data-word'));
                    } else if (($link.attr('data-definition') != '?') && $.inArray($link.attr('data-word'), scope.nbNewWords) != -1) {
                        var index = scope.nbNewWords.indexOf($link.attr('data-word'));

                        if (index > -1) {
                            scope.nbNewWords.splice(index, 1);
                        }
                    }
                
                    // When the list is updated, adjust tooltip position
                    if ($link.offset().left < ($('body').width() / 2) ) {
                        $link.parent().addClass('hint--right');
                        $link.parent().removeClass('hint--left');
                    } else {
                        $link.parent().addClass('hint--left');
                        $link.parent().removeClass('hint--right');
                    }
                }

                scope.$watch(attrs.myCurrentTime, function(value) {
                    update();
                });

                element.on('$destroy', function() {
                    $interval.cancel(timeoutId);
                });
                
                // Hide link
                element.on('click', function(e) {
                    e.preventDefault();

                    if ($link.attr('data-link').length > 0) {
		                window.open($link.attr('data-link'), '_blank');
                    }
                    
                    return false;
	            });

                timeoutId = $interval(function() {
                    update();
                }, 1000);
            }
            
            return {
                restrict: 'A',
                template: linkTpl,
                link: link
            };
        }
    ]);
});
