import templateUrl from './process-snapshots-modal.html';

export const ProcessSnapshotsModalComponent = {
  controller: ComponentController,
  controllerAs: 'vm',
  bindings: {
    resolve: '<',
    modalInstance: '<',
    close: '&',
    dismiss: '&',
  },
  templateUrl,
};

/** @ngInject */
function ComponentController($controller, $state, EventNotifications, VmsService, sprintf) {
  const vm = this;

  vm.$onInit = function() {
    angular.extend(vm, $controller('BaseModalController', {
      $uibModalInstance: vm.modalInstance,
    }));

    angular.extend(vm, {
      modalData: {},
      vm: vm.resolve.vm,
      modalType: vm.resolve.modalType,
      save: save,
    });
  };

  function save() {
    VmsService.createSnapshots(vm.vm.id, vm.modalData).then(success, failure);
  }

  function success() {
    vm.close();
    $state.go($state.current, {}, {reload: true});
    EventNotifications.success(sprintf(__("Creating snapshot %s of VM %s."), vm.modalData.name, vm.vm.name));
  }

  function failure(response) {
    EventNotifications.error(__('There was an error creating the snapshot.') + response.message);
  }
}
