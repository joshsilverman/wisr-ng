'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:QuizmakerCtrl
 * @description
 * # QuizmakerCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('QuizmakerCtrl', function($scope, $routeParams, $rootScope, $q, $location, Paths, CurrentUserRsrc, AskersRsrc, LessonRsrc) {
    function init() {
      $scope.assetBasePath = Paths.assets;
      $rootScope.assetBasePath = Paths.assets;
      $scope.imageBaseURL = Paths.imageBaseURL;
      $scope.Paths = Paths;

      $q.all([
          CurrentUserRsrc.get().$promise,
          AskersRsrc.query().$promise])
        .then(afterLoadUsers);
    }

    function afterLoadUsers(data) {
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
      var url = ['', $scope.currentAsker.subject_url, 'quiz', quiz.id].join('/');
      $scope.quiz = quiz;
      $location.path(url).replace();
    }

    function loadQuizData(questions) {
      $scope.quiz = new LessonRsrc(questions[0]._lesson);
      $scope.questions = questions;
      $scope.$watch('quiz.name', _.throttle(onNameUpdated, 2000));
    }

    function onNameUpdated() {
      $scope.quiz.$update({id: $scope.quiz.id});
    }

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