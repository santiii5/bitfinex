import React from 'react'
import Container from '../containers/container'
import styled, {css} from 'styled-components'
import {numberFormat} from '../helpers/utils'

const TradesLayout = styled.div`
`

const TradeLine = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid grey;
  padding: 2px 5px;
  justify-items: right;

  .amount {
    color: red;
  }

  ${props => props.positiveAmount && css`
    .amount {
      color: green;
    }
  `}

  ${props => props.header && css`
    font-size: 18px;
    color: yellow;
    font-weight: bold;
  `}
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
          <TradeLine key={key} positiveAmount={amount > 0}>
            <div>{date.toLocaleTimeString()}</div>
            <div className="amount">{numberFormat(amount)}</div>
            <div>{numberFormat(price)}</div>
          </TradeLine>
        )

      })
    }

    return (
      <TradesLayout>
        <h3>Trades</h3>
        <TradeLine header={true}>
          <div>Time</div>
          <div>Amount</div>
          <div>Price</div>
        </TradeLine>
        {htmlElem}
      </TradesLayout>
    )
  }
}
