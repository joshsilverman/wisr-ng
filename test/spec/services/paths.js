'use strict';

describe('Service: paths', function () {

  // load the service's module
  beforeEach(module('wisrNgApp'));

  // instantiate service
  var paths;
  beforeEach(inject(function (_paths_) {
    paths = _paths_;
  }));

  it('should do something', function () {
    expect(!!paths).toBe(true);
  });

});
