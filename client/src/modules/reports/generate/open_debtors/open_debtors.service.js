angular.module('bhima.services')
  .service('OpenDebtorsReportService', OpenDebtorsReportService);

/**
 * @class OpenDebtorsReportService
 *
 * @description
 * An object that contains keys/properties relevant to rendering the Open
 * Debtors Report.
 */
function OpenDebtorsReportService() {
  var service = this;

  var ASC = 1;
  var DESC = 0;

  service.ASC = ASC;
  service.DESC = DESC;

  service.orders = [{
    label : 'REPORT.ORDER.LAST_PAYMENT',
    value : 'payment-date-asc',
    direction : ASC,
  }, {
    label : 'REPORT.ORDER.LAST_PAYMENT',
    value : 'payment-date-desc',
    direction : DESC,
  }, {
    label : 'REPORT.ORDER.LAST_INVOICE',
    value : 'invoice-date-asc',
    direction : ASC,
  }, {
    label : 'REPORT.ORDER.LAST_INVOICE',
    value : 'invoice-date-desc',
    direction : DESC,
  }, {
    label : 'REPORT.ORDER.PATIENT_NAME',
    value : 'patient-name-asc',
    direction : ASC,
  }, {
    label : 'REPORT.ORDER.PATIENT_NAME',
    value : 'patient-name-desc',
    direction : DESC,
  }, {
    label : 'REPORT.ORDER.TOTAL_DEBT',
    value : 'debt-asc',
    direction : ASC,
  }, {
    label : 'REPORT.ORDER.TOTAL_DEBT',
    value : 'debt-desc',
    direction : DESC,
  }];

  return service;
}
