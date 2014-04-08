/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module', 'jquery', './home-directives'], function(controllers, $) {
    'use strict';

    controllers.controller('HomeController', ['$scope', 'fireRef',
        function HomeController($scope, fireRef) {
            $scope.newWord              = '';
            $scope.newWordDefinition    = '';
            $scope.nbWords              = 0;

            $scope.$watch('words', function() {
                $scope.nbWords = $scope.words.$getIndex().length;
            }, true);

            $scope.addWord = function() {
                var newWord             = $scope.newWord.trim();
                var newWordDefinition   = $scope.newWordDefinition.trim();
                
                if (!newWord.length || !newWordDefinition.length) {
                    return;
                }
                
                if ((newWord.indexOf("<") >= 0) || (newWordDefinition.indexOf("<") >= 0)) {
                    return;
                }
                
                var unix = Math.round(+new Date()/1000);

                $scope.words.$add({
                    creation: unix,
                    word: newWord,
                    definition: newWordDefinition
                });

                $scope.newWord              = '';
                $scope.newWordDefinition    = '';
            };

            $scope.loadDefinition = function(id) {
            };

            $scope.words = fireRef.words();
        }
    ]);
});
