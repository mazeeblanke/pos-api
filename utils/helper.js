const _ = require('lodash')

const parseAmount = amount => parseFloat(amount.toFixed(2))

const calculateDiscount = (subTotal, threshold, discount) => {
  console.log(subTotal)
  console.log(threshold)
  console.log(discount)
  return threshold && parseAmount((subTotal / threshold) * discount)
}

const subtractCash = (cash1, cash2) => {
  return parseAmount(Math.max(cash1 - cash2, 0))
}

const calculatePercentInCash = (percent, total) => {
  return parseAmount(Math.max(percent / 100 * total, 0))
}

const parseColData = data => {
  return data || '-'
}

const calcSubTotal = items => {
  const subTotals = _.map(items, 'sub_total')
  return sumCash(subTotals)
}

const sumCash = cashList => {
  // console.log('==============')
  return cashList.reduce((agg, cash) => {
    // console.log(parseFloat(cash))
    // console.log(agg)
    return agg + parseFloat(cash)
  }, 0)
}

module.exports = {
  calculateDiscount,
  subtractCash,
  calculatePercentInCash,
  parseColData,
  calcSubTotal,
  parseAmount,
  sumCash
}
