import moment from 'moment'

export default {
  formatAsPrice (price) {
    return '$ ' + String(price.toFixed(2))
  },
  formatAsTime (time) {
    return moment(Number(time)).format('hh:mm:ss a - DD/MM/YYYY')
  }
}
