'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:QuizmakerCtrl
 * @description
 * # QuizmakerCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('QuizmakerCtrl', function($scope, $routeParams, $rootScope, $q, $location, CurrentUserRsrc, AskersRsrc, LessonRsrc, QuestionRsrc, Paths) {
    function init() {
      $q.all([
          CurrentUserRsrc.get().$promise,
          AskersRsrc.query().$promise])
        .then(onLoadUsersSuccess, onLoadUsersFailure);
    }

    function onLoadUsersFailure() {
      var url = [Paths.apiURL, '/users/sign_in'].join('');
      location.href = url;
    }

    function onLoadUsersSuccess(data) {
      $scope.currentUser = data[0];
      setCurrentAsker(data[1]);
      configStyles();

      findOrCreateQuiz()
    }

    function findOrCreateQuiz() {
      if ($routeParams.id) {
        LessonRsrc.get({id: $routeParams.id}).$promise.then(loadQuizData);
      } else {
        LessonRsrc.save({
          asker_id: $scope.currentAsker.id, 
          name: 'untitled',
          type_id: 6
        }).$promise.then(navToQuiz);
      }
    }

    function navToQuiz(quiz) {
      var url = ['', $scope.currentAsker.subject_url, quiz.id, 'quiz', 'edit'].join('/');
      $scope.quiz = quiz;
      $location.path(url).replace();
    }

    function loadQuizData(lessonItems) {
      $scope.quiz = new LessonRsrc(lessonItems[0]._lesson);
      $scope.lessonItems = lessonItems;

      if ($scope.currentUser.id == lessonItems[0]._lesson.user_id) {
        $scope.editMode = true;
      }
    }

    $scope.addQuestion = function() {
      new QuestionRsrc({
          asker_id:$scope.quiz.asker_id,
          lesson_id:$scope.quiz.id
        }).$save().then(function(questionAsPublication) {
          $scope.lessonItems.push(questionAsPublication);
        });
    };

    function setCurrentAsker(_askers) {
      $scope.askers = _askers;
      $scope.currentAsker = _.find($scope.askers, function(a) {
        return a.subject_url == $routeParams.subjectURL;
      });
    }

    function configStyles() {
      $scope.bgColor = $scope.currentAsker.styles["bg_color"] || '#202734';
      $scope.silhouetteColor = $scope.currentAsker.styles["silhouette_color"] || '#292935';
      $scope.questImage = $scope.currentAsker.styles["quest_image"] || "quests/scholar.png";

      $rootScope.title = "Quiz Maker | Wisr";
    }

    init();
  });