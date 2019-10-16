import moment from 'moment'

export default {
  formatAsPrice (price) {
    return '$ ' + String(price.toFixed(2))
  },
  formatAsTime (time) {
    return moment(Number(time)).format('hh:mm:ss a - DD/MM/YYYY')
  },
  formatListAllProducts (products) {
    if (products) {
      let text = ''
      for (const p of products) {
        text += p.qty + 'x' + p.product.name + ', '
      }
      text = text.slice(0, -2)
      return text
    } else {
      return ''
    }
  }
}
