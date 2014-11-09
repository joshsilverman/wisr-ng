'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:PublicationMetaInfoCtrl
 * @description
 * # PublicationMetaInfoCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('PublicationMetaInfoCtrl', function ($scope, RatingsRsrc) {
    function init() {
      setAuthorInfo();
      setCounts();      
      setRating();

      $scope.$on('PublicationsCtrl:ratings:loaded', registerRating);
    }

    function setAuthorInfo() { 
      if (!$scope.publication) return;
      if (!$scope.publication._question) return;

      $scope.author = $scope.publication._question.author_twi_screen_name
      $scope.created_at = $scope.publication._question.created_at
    }

    function setCounts() {
      var correctCount = 0,
        incorrectCount = 0;

      $scope.answered_count = 0;
      $scope.percent_correct = 0;

      if (!$scope.publication) return;
      if (!$scope.publication._answer_counts) return;

      if ($scope.publication._answer_counts.correct) {
        correctCount = parseInt($scope.publication._answer_counts.correct);
        $scope.answered_count += correctCount;
      }

      if ($scope.publication._answer_counts.incorrect) {
        incorrectCount = parseInt($scope.publication._answer_counts.incorrect);
        $scope.answered_count += incorrectCount;
      }

      if ((incorrectCount + correctCount) > 0)
        $scope.percent_correct = correctCount / (incorrectCount + correctCount) * 100;
    }

    $scope.hoveringOver = function(score) {
      $scope.overStar = score;
      $scope.percent = 100 * (score / $scope.max);
    };

    function setRating() {
      $scope.rating = {score: $scope.publication._question.rating || '0.0'};


      $scope.prevRatingScore = $scope.rating.score;
      $scope.$watch('rating.score', changeRating);
    }

    function registerRating(e, ratings) {
      var rating = _.find(ratings, function(r) {
        return r.question_id == $scope.publication.question_id;
      });

      $scope.prevRatingScore = rating.score;
      $scope.rating = {score: rating.score};
    };

    function changeRating() {
      if ($scope.rating.score == $scope.prevRatingScore) 
        return;
      else
        $scope.prevRatingScore = $scope.rating.score;

      RatingsRsrc.save({
        score: $scope.rating.score,
        question_id: $scope.publication.question_id});
    }

    init();
  });
