const _ = require('lodash')

const parseAmount = amount => parseFloat(amount.toFixed(5))

const calculateDiscount = (subTotal, threshold, discount) => {
  return threshold && parseAmount((subTotal / threshold) * discount)
}

const multiplyCash = (a, b) => (a * b).toFixed(2)

const subtractCash = (cash1, cash2) => {
  return parseAmount(Math.max(cash1 - cash2, 0))
}

const calculatePercentInCash = (percent, total) => {
  return parseAmount(Math.max(percent / 100 * total, 0))
}

const format = 'YYYY-MM-DD HH:mm:ss'

const moment = require('moment')

const parseColData = data => {
  return data || '-'
}

const parseDateTime = (d) => {
  if (d) {
    const dateTime = moment(d, format).format(format)
    return moment(d, format).isValid() ? dateTime : moment().format(format)
  }
  return null
}

const calcSubTotal = items => {
  const subTotals = _.map(items, 'sub_total')
  return sumCash(subTotals)
}

const sumCash = cashList => {
  return cashList.reduce((agg, cash) => {
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
  sumCash,
  multiplyCash,
  parseDateTime
}
