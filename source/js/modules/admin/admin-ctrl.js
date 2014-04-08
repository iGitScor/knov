/**
 * Admin controller definition
 * @scope Controllers
 */
define(['./module'], function(controllers) {
    'use strict';

    controllers.controller('AdminController', ['$scope', 'fireRef',
        function AdminController($scope, fireRef) {

            $scope.newWord = '';
            $scope.nbWords = 0;

            $scope.$watch('words', function() {
                $scope.nbWords = $scope.words.$getIndex().length;
            }, true);

            $scope.addWord = function() {
                var newWord = $scope.newWord.trim();
                if (!newWord.length) {
                    return;
                }
                $scope.words.$add({
                    url: newWord,
                    nbClick: 0
                });
                $scope.newWord = '';
            };

            $scope.editWord = function(id) {
                $scope.editedWord = $scope.words[id];
            };


            $scope.doneEditing = function(id) {
                var word = $scope.words[id];
                word.url = word.url.trim();
                $scope.words.$save();

                if (!word.url) {
                    $scope.removeWord(id);
                }
                $scope.editedWord = null;
            };

            $scope.removeWord = function(id) {
                $scope.words.$remove(id);
            };

            $scope.words = fireRef.words();
        }
    ]);
});
