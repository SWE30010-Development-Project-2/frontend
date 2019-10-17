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
        text += p.qty + '×' + p.product.name + ', '
      }
      text = text.slice(0, -2)
      return text
    } else {
      return ''
    }
  },
  formatListProductsShort (products) {
    if (products) {
      let text = ''
      const maxLength = 4

      for (const p of products.slice(0, maxLength)) {
        text += p.qty + '×' + p.product.name + ', '
      }
      if (products.length > maxLength) {
        text = text.slice(0, -2) + ' and other items'
      } else {
        text = text.slice(0, -2)
      }

      return text
    }
  }
}
