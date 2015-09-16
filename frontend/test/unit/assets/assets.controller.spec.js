(function () {
  'use strict';

  describe('AssetCtrl', function () {
    var $scope, $q, $modal, assetsService, artifactRepo, controller, component;

    beforeEach(module('bonitasoft.designer.assets', 'ui.bootstrap'));

    beforeEach(inject(function ($injector) {
      $scope = $injector.get('$rootScope').$new();
      $q = $injector.get('$q');
      assetsService = $injector.get('assetsService');
      $modal = $injector.get('$modal');
      component = {id: 12};
      artifactRepo = {
        loadAssets: function () {
          return $q.when([
            {id: '123', name: 'myAsset', scope: 'PAGE', active: true},
            {id: '456', name: 'myPrivateDeactivatedAsset', scope: 'PAGE', active: false},
            {id: '789', name: 'publicAsset', scope: 'WIDGET', active: true},
            {id: '321', name: 'publicDeactivatedAsset', scope: 'WIDGET', active: false}
          ]);
        },
        deleteAsset: function () {
        },
        createAsset: function () {
        }
      };
    }));

    describe('Page editor', function () {

      beforeEach(inject(function ($injector) {
        $scope.page = {};
        controller = $injector.get('$controller')('AssetCtrl', {
          $scope: $scope,
          $modal: $modal,
          artifact: component,
          artifactRepo: artifactRepo,
          mode: 'page',
          assetsService: assetsService
        });
      }));

      it('should put assets in $scope', function () {
        $scope.$digest();
        expect(controller.assets).toEqual([
          {id: '123', name: 'myAsset', scope: 'PAGE', active: true},
          {id: '456', name: 'myPrivateDeactivatedAsset', scope: 'PAGE', active: false},
          {id: '789', name: 'publicAsset', scope: 'WIDGET', active: true},
          {id: '321', name: 'publicDeactivatedAsset', scope: 'WIDGET', active: false}
        ]);
        expect(component.assets).toEqual([
          {id: '123', name: 'myAsset', scope: 'PAGE', active: true},
          {id: '456', name: 'myPrivateDeactivatedAsset', scope: 'PAGE', active: false}
        ]);
        expect(component.inactiveAssets).toEqual(['456', '321'
        ]);
      });

      it('should expose filters', function () {
        $scope.$digest();
        expect(controller.filters).toEqual({
          js: {label: 'JavaScript', value: true},
          css: {label: 'CSS', value: true},
          img: {label: 'Image', value: true}
        });
      });

      it('should open a data popup for asset preview', function () {
        spyOn($modal, 'open').and.returnValue({
          result: $q.when({})
        });
        controller.openAssetPreviewPopup();
        expect($modal.open).toHaveBeenCalled();
      });

      it('should open a data popup for asset management', function () {
        spyOn($modal, 'open').and.returnValue({
          result: $q.when({})
        });
        controller.openAssetPopup();
        expect($modal.open).toHaveBeenCalled();
      });

      it('should delete an asset', function () {
        var asset = {name: 'myasset.js'};

        spyOn(artifactRepo, 'deleteAsset').and.returnValue($q.when({}));

        controller.delete(asset);
        $scope.$apply();

        expect(artifactRepo.deleteAsset).toHaveBeenCalledWith(12, asset);
      });

      it('should return an empty promise when arg datas is undefined in createOrUpdate', function () {
        expect(controller.createOrUpdate()).toEqual($q.when({}));
      });

      it('should save an external asset', function () {
        var asset = {name: 'myasset.js', isNew: true};
        spyOn(artifactRepo, 'createAsset').and.returnValue($q.when({}));

        controller.createOrUpdate(asset);

        expect(artifactRepo.createAsset).toHaveBeenCalled();
      });

    });


    describe('Widget editor', function () {

      beforeEach(inject(function ($injector) {
        $scope.widget = {};
        controller = $injector.get('$controller')('AssetCtrl', {
          $scope: $scope,
          artifact: {},
          artifactRepo: artifactRepo,
          mode: 'widget',
          assetsService: assetsService
        });
      }));

      it('should put assets in $scope', function () {
        $scope.$digest();
        expect(controller.assets).toEqual([
          {id: '123', name: 'myAsset', scope: 'PAGE', active: true},
          {id: '456', name: 'myPrivateDeactivatedAsset', scope: 'PAGE', active: false},
          {id: '789', name: 'publicAsset', scope: 'WIDGET', active: true},
          {id: '321', name: 'publicDeactivatedAsset', scope: 'WIDGET', active: false}
        ]);
      });

      it('should open a data popup for asset preview', function () {
        spyOn($modal, 'open').and.returnValue({
          result: $q.when({})
        });
        controller.openAssetPreviewPopup();
        expect($modal.open).toHaveBeenCalled();
      });

      it('should open a data popup for asset management', function () {
        spyOn($modal, 'open').and.returnValue({
          result: $q.when({})
        });
        controller.openAssetPopup();
        expect($modal.open).toHaveBeenCalled();
      });

      it('should open a data popup for asset preview', function () {
        spyOn($modal, 'open').and.returnValue({
          result: $q.when({})
        });
        controller.openAssetPreviewPopup();
        expect($modal.open).toHaveBeenCalled();
      });


    });


  });
})();
