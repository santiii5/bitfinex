import React from 'react'
import Container from '../containers/container'
import styled from 'styled-components'
import { TableRow } from '../Style'
import { numberFormat } from '../helpers/utils'

const TradesLayout = styled.div`
`

export default class Trades extends Container {
  render() {
    const {
      data,
    } = this.props
    const htmlElem = []

    if(data) {
      data.slice(0, 20).forEach((trade, key) => {
        const date = new Date(trade[1])
        const amount = trade[2]
        const price = trade[3]

        htmlElem.push(
          <TableRow key={key} positiveAmount={amount > 0}>
            <div>{date.toLocaleTimeString()}</div>
            <div className="amount">{numberFormat(amount)}</div>
            <div>{numberFormat(price)}</div>
          </TableRow>
        )
      })
    }

    const component = data ? (
      <div>
        <TableRow header={true}>
          <div>Time</div>
          <div>Amount</div>
          <div>Price</div>
        </TableRow>
        {htmlElem}
      </div>
    ) : 'Loading trades...'

    return (
      <TradesLayout>
        <h3>Trades</h3>
        {component}
      </TradesLayout>
    )
  }
}
