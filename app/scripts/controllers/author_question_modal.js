'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:AuthorQuestionModalCtrl
 * @description
 * # AuthorQuestionModalCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('AuthorQuestionModalCtrl', function ($scope, $rootScope, $location, $timeout) {
    function init() {
      $rootScope.$on('FeedCtrl::fetchedCurrentAsker', registerCurrentAsker);
      if ($location.search().q) showModal();

      $scope.incorrectAnswerCount = 1;
      $scope.question = {
        text: '',
        correctAnswer: '',
        incorrectAnswers: {0: ''}};
    }

    function getModal(callback) {
      var modal = $('#post_question_modal');
      if (modal.length)
        callback(modal);
      else
        $timeout(function() {getModal(callback)}, 100);
    }

    function showModal() {
      getModal(function(modal) {
        $scope.$emit('AuthorQuestionModalCtrl:showAuthorQuestionModal');
        modal.modal('show');
      });
    }

    function registerCurrentAsker(e, _currentAsker) {
      $scope.currentAsker = _currentAsker;
    }

    $scope.addAnswer = function() {
      if ($scope.incorrectAnswerCount > 2) return;

      $scope.question.incorrectAnswers[$scope.incorrectAnswerCount] = '';
      $scope.incorrectAnswerCount = _.keys($scope.question.incorrectAnswers).length;
    }

    $scope.submit = function() {
      if (!valid()) return;

      var flatData = {
        "question" : $scope.question.text,
        "asker_id" : $scope.currentAsker.id,
        "canswer"  : $scope.question.correctAnswer,
        "ianswer1" : $scope.question.incorrectAnswers[0],
        "ianswer2" : $scope.question.incorrectAnswers[1] || '',
        "ianswer3" : $scope.question.incorrectAnswers[2] || '',
      };

      // $http.post("/questions/save_question_and_answers",
      //   type: "POST",
      //   data: data,
      //   error: => alert "Sorry, something went wrong!",
      //   success: (e) =>
      //     $("#question_input, #canswer input, #ianswer1 input, #ianswer2 input, #ianswer3 input").val("")
      //     if post_id
      //       window.feed.post_another()
      //       modal.modal('hide')
      //       $(".post[post_id=#{post_id}]").parent().css("opacity", 0.8)
      //     else
      //       modal.find(".question_form").hide()
      //       modal.find(".message").show()
      //       modal.find(".modal-body").slideToggle(250)
    }

    function valid() {
      function textPresent(validateable) {
        if (!validateable) return false;
        if (!validateable.length) return false;

        return true;
      }

      if (!textPresent($scope.question.text)) {
        alert("Please enter a question.");
        return false
      }

      if (!textPresent($scope.question.correctAnswer)) {
        alert("Please enter a correct answer.")
        return false
      }

      if (!textPresent($scope.question.incorrectAnswers[0])) {
        alert("Please enter at least one incorrect answer.");
        return false;
      }

      return true
    }

    init();
  });
