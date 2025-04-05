export const PATH_AUTH = {
  login: '/login',
  changePassword: '/change-password',
  juristicCompanies: '/juristic-companies',
}

export const AUTH_PATH_LIST = Object.values(PATH_AUTH)

export const PROTECTED_PATH = {
  accountingSelectionPath: '/top',
  slipProcessingPath: '/slip-processing',
  contractList: '/contracts',
  contractsCreate: '/contracts/create',
  contractsDetail: '/contracts/detail',
  contractsCopy: '/contracts/copy',
  expenditureList: '/expenditures',
  expenditureCreate: '/expenditures/create',
  expenditureDetail: '/expenditures/detail',
  expenditureCopy: '/expenditures/copy',
  billIncomeSlipList: '/bill-income-slips',
  billIncomeSlipCreate: '/bill-income-slips/create',
  billIncomeSlipDetail: '/bill-income-slips/detail',
  billIncomeCopy: '/bill-income-slips/copy',
  transferSlipList: '/transfers',
  transferSlipCreate: '/transfers/create',
  transferSlipDetail: '/transfers/detail',
  transferSlipCopy: '/transfers/copy',
  accrualProcessing: '/accrual-accounts',
  accrualProcessingResult: '/accrual-accounts/search',
  accrualProcessingDetail: '/accrual-accounts/detail',
  slipList: '/slips/list',
  approvedSlipList: '/slips/approved',
  unapprovedSlipList: '/slips/unapproved',
}
