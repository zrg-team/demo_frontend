import BigNumber from 'bignumber.js'

export function format (value, decimalCount = 2, decimal = '.', thousands = ',') {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = value < 0 ? '-' : ''

    const i = parseInt(value = Math.abs(Number(value) || 0).toFixed(decimalCount)).toString()
    const j = (i.length > 3) ? i.length % 3 : 0

    return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) + (decimalCount ? decimal + Math.abs(value - i).toFixed(decimalCount).slice(2) : '')
  } catch (e) {
    console.error(e)
    return 0
  }
}

export function formatCurrency (value, digit = 0) {
  try {
    if (!['string', 'number'].includes(typeof value)) {
      throw new Error('TYPE_ERROR')
    }
    const number = new BigNumber(`${value}`)
    return number.toFormat(digit)
  } catch (err) {
    return '0'
  }
}

export function formatToUrl (url) {
  return encodeURIComponent(
    `${url}`
      .replace(/ /g, '-')
      .replace(/\//g, '-')
  )
}

export function formatBidTime (time) {
  let day = Math.round(time / 24)
  let hour = time % 24

  day = day ? (day === 1 ? `${day} day` : `${day} days`) : ''
  hour = hour ? (hour === 1 ? `${hour} hour` : `${hour} hours`) : ''

  return !!day && !!hour ? `${day} ${hour}` : `${day} ${hour}`
}
