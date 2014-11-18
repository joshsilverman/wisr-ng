'use strict';

/**
 * @ngdoc function
 * @name wisrNgApp.controller:QuizmakerCtrl
 * @description
 * # QuizmakerCtrl
 * Controller of the wisrNgApp
 */
angular.module('wisrNgApp')
  .controller('QuizmakerCtrl', function($scope, $routeParams, $rootScope, $q, $location, Paths, CurrentUserRsrc, AskersRsrc, QuizRsrc) {
    function init() {
      $scope.assetBasePath = Paths.assets;
      $rootScope.assetBasePath = Paths.assets;
      $scope.imageBaseURL = Paths.imageBaseURL;
      $scope.Paths = Paths;

      console.log('init');
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
        QuizRsrc.get({id: $routeParams.id}).$promise.then(loadQuizData);
      } else {
        QuizRsrc.save({
          asker_id: $scope.currentAsker.id, 
          name: 'untitled',
          type_id: 6
        }).$promise.then(navToQuiz);
      }
    }

    function navToQuiz(quiz) {
      $scope.quiz = quiz;
      var url = ['', $scope.currentAsker.subject_url, 'quiz', quiz.id].join('/');
      $location.path(url).replace();
    }

    function loadQuizData() {
      $scope.title = {text: 'Untitled'};
      $scope.$watch('title.text', _.throttle(onTitleUpdated, 1500));
    }

    function onTitleUpdated(title) {
      // debugger;
      // QuizRsrc.save({id: })
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