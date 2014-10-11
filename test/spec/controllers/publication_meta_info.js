'use strict';

describe('Controller: PublicationMetaInfoCtrl', function () {
  beforeEach(module('wisrNgApp'));

  var PublicationMetaInfoCtrl,
    scope, __controller__, __rootScope__;

  beforeEach(inject(function ($controller, $rootScope) {
    __controller__ = $controller
    __rootScope__ = $rootScope
  }));

  it('should attach authored info directly to scope', function () {
    scope = __rootScope__.$new();
    scope.publication = {
      _question: {
        author_twi_screen_name: 'abe',
        created_at: 'today'
      }
    }

    PublicationMetaInfoCtrl = __controller__('PublicationMetaInfoCtrl', {
      $scope: scope
    });

    expect(scope.author).toEqual('abe');
    expect(scope.created_at).toEqual('today');
  });

  it('wont error if author unavailable', function () {
    scope = __rootScope__.$new();
    PublicationMetaInfoCtrl = __controller__('PublicationMetaInfoCtrl', {
      $scope: scope
    });

    expect(scope.author).toEqual(undefined);
  });

  it('should attach counts', function () {
    scope = __rootScope__.$new();
    scope.publication = {
      _answer_counts: {
        correct: '25',
        incorrect: '75'
      }
    }

    PublicationMetaInfoCtrl = __controller__('PublicationMetaInfoCtrl', {
      $scope: scope
    });

    expect(scope.answered_count).toEqual(100);
  });

  it('should attach aggregate counts when one is 0', function () {
    scope = __rootScope__.$new();
    scope.publication = {
      _answer_counts: {
        correct: '25',
        incorrect: '0'
      }
    }

    PublicationMetaInfoCtrl = __controller__('PublicationMetaInfoCtrl', {
      $scope: scope
    });

    expect(scope.answered_count).toEqual(25);
  });

  it('should attach percent correct', function () {
    scope = __rootScope__.$new();
    scope.publication = {
      _answer_counts: {
        correct: '25',
        incorrect: '75'
      }
    }

    PublicationMetaInfoCtrl = __controller__('PublicationMetaInfoCtrl', {
      $scope: scope
    });

    expect(scope.percent_correct).toEqual(25);
  });

  it('should attach percent correct as 0 when nothing answered', function () {
    scope = __rootScope__.$new();
    scope.publication = {
      _answer_counts: {
        correct: '0',
        incorrect: '0'
      }
    }

    PublicationMetaInfoCtrl = __controller__('PublicationMetaInfoCtrl', {
      $scope: scope
    });

    expect(scope.percent_correct).toEqual(0);
  });
});
