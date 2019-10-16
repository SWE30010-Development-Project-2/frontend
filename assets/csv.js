import jsoncsv from 'json-csv'
import FileSaver from 'file-saver'

export default {
  exportToCSV (transactions) {
    const data = transactions.map(t => ({ id: t.id, noItems: t.NoItems, itemsSold: t.itemsSoldLong, price: t.price, time: this.formatAsTime(t.createdAt) }))
    const options = {
      fields: [
        {
          name: 'id',
          label: 'Transaction ID',
          quoted: true
        },
        {
          name: 'noItems',
          label: 'Number of Items',
          quoted: true
        },
        {
          name: 'itemsSold',
          label: 'Items Sold',
          quoted: true
        },
        {
          name: 'price',
          label: 'Price of Transaction',
          quoted: true
        },
        {
          name: 'time',
          label: 'Time of transaction',
          quoted: true
        }
      ]
    }

    jsoncsv.csvBuffered(data, options, (err, csv) => {
      if (!err) {
        const blob = new Blob([csv], { type: 'text/plain;charset=utf-8' })
        FileSaver.saveAs(blob, 'transactions.csv')
      } else {
        console.log(err)
      }
    })
  }
}
