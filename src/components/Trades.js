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
    if(data && data.data) {
      data.data.forEach((trade, key) => {
        const date = new Date(trade[1])
        const price = trade[3]
        const amount = trade[2]

        htmlElem.push(
          <TradeLine key={key}>
            <div>{date.toLocaleTimeString()}</div>
            <div>{numberFormat(amount)}</div>
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
