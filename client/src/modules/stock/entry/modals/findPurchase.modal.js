angular.module('bhima.controllers')
  .controller('StockFindPurchaseModalController', StockFindPurchaseModalController);

StockFindPurchaseModalController.$inject = [
  '$uibModalInstance', 'PurchaseOrderService', 'NotifyService',
  'uiGridConstants', 'GridFilteringService', 'ReceiptModal',
  'bhConstants',
];

function StockFindPurchaseModalController(
  Instance, Purchase, Notify,
  uiGridConstants, Filtering, Receipts, bhConstants
) {
  var vm = this;
  var filtering;
  var columns;

  // global
  vm.selectedRow = {};

  /* ======================= Grid configurations ============================ */
  vm.filterEnabled = false;
  vm.gridOptions = { appScopeProvider : vm };

  filtering = new Filtering(vm.gridOptions);

  columns = [
    {
      field            : 'reference',
      displayName      : 'TABLE.COLUMNS.REFERENCE',
      headerCellFilter : 'translate',
      cellTemplate     : 'modules/stock/entry/modals/templates/purchase_reference.tmpl.html',
    },

    {
      field            : 'date',
      cellFilter       : 'date:"'.concat(bhConstants.dates.format, '"'),
      filter           : { condition : filtering.filterByDate },
      displayName      : 'TABLE.COLUMNS.DATE',
      headerCellFilter : 'translate',
      sort             : { priority : 0, direction : 'desc' },
    },

    {
      field            : 'supplier',
      displayName      : 'FORM.LABELS.SUPPLIER',
      headerCellFilter : 'translate',
    },

    {
      field            : 'cost',
      displayName      : 'STOCK.AMOUNT',
      headerCellFilter : 'translate',
      cellFilter       : 'currency: grid.appScope.enterprise.currency_id',
      cellClass        : 'text-right',
    },

    { field : 'author', displayName : 'TABLE.COLUMNS.BY', headerCellFilter : 'translate' },
  ];

  vm.gridOptions.columnDefs = columns;
  vm.gridOptions.multiSelect = false;
  vm.gridOptions.enableFiltering = vm.filterEnabled;
  vm.gridOptions.onRegisterApi = onRegisterApi;
  vm.toggleFilter = toggleFilter;

  // bind methods
  vm.submit = submit;
  vm.cancel = cancel;
  vm.showReceipt = showReceipt;

  function onRegisterApi(gridApi) {
    vm.gridApi = gridApi;
    vm.gridApi.selection.on.rowSelectionChanged(null, rowSelectionCallback);
  }

  function rowSelectionCallback(row) {
    vm.selectedRow = row.entity;
  }

  /** toggle filter */
  function toggleFilter() {
    vm.filterEnabled = !vm.filterEnabled;
    vm.gridOptions.enableFiltering = vm.filterEnabled;
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.COLUMN);
  }

  /** get purchase document */
  function showReceipt(uuid) {
    Receipts.purchase(uuid);
  }

  /* ======================= End Grid ======================================== */

  Purchase.search({ detailed : 1, status_id : [2, 4] })
    .then(function fillGrid(purchases) {
      vm.gridOptions.data = purchases;
    })
    .catch(Notify.errorHandler);

  // submit
  function submit() {
    if (!vm.selectedRow) { return null; }

    return Purchase.stockBalance(vm.selectedRow.uuid)
      .then(function close(purchase) {
        Instance.close(purchase);
      })
      .catch(Notify.errorHandler);
  }

  // cancel
  function cancel() {
    Instance.close();
  }
}
