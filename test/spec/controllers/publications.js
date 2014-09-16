'use strict';

describe('Controller: PublicationsCtrl', function () {

  // load the controller's module
  beforeEach(module('wisrNgApp'));

  var PublicationsCtrl,
    scope, _PublicationsRsrc_, root, _controller_;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, $injector) {
    scope = $rootScope.$new();
    scope.currentUser = {id: 123}

    _controller_ = $controller;

    _PublicationsRsrc_ = $injector.get('PublicationsRsrc');
    spyOn(_PublicationsRsrc_, 'query');
    spyOn(_PublicationsRsrc_, 'queryNew');
  }));

  it('should query Publications resource and set publications to scope', function () {
    root = {current: {$$route: {params: {}}}};
    PublicationsCtrl = _controller_('PublicationsCtrl', {
      $scope: scope,
      PublicationsRsrc: _PublicationsRsrc_,
      $route: root
    });

    scope.$emit('FeedCtrl:currentUserLoaded');

    expect(_PublicationsRsrc_.query).toHaveBeenCalled();
    expect(scope.publications).toBeDefined();
  });

  it('should query new Publications and set publications to scope', function () {
    root = {current: {$$route: {params: {new: true}}}};
    PublicationsCtrl = _controller_('PublicationsCtrl', {
      $scope: scope,
      PublicationsRsrc: _PublicationsRsrc_,
      $route: root
    });

    scope.$emit('FeedCtrl:currentUserLoaded');

    expect(_PublicationsRsrc_.queryNew).toHaveBeenCalled();
    expect(scope.publications).toBeDefined();
  });

  it('should query lesson Publications and set publications to scope', function () {
    root = {current: {$$route: {params: {quiz: true}}}};
    PublicationsCtrl = _controller_('PublicationsCtrl', {
      $scope: scope,
      PublicationsRsrc: _PublicationsRsrc_,
      $route: root
    });

    scope.$emit('FeedCtrl:currentUserLoaded');

    expect(_PublicationsRsrc_.queryNew).toHaveBeenCalled();
    expect(scope.publications).toBeDefined();
  });
});
