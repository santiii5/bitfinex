import React from 'react'
import Container from '../containers/container'
import styled from 'styled-components'
import {numberFormat} from '../helpers/utils'

const TickerLayout = styled.div``

export default class Ticker extends Container {
  render() {
    const {
      data,
      pair,
    } = this.props
    let lastPrice
    let percentChangeDay
    let dayVolume

    if (data) {
      lastPrice = data[6]
      percentChangeDay = data[5]
      dayVolume = data[7]
    }

    const colorStyle = percentChangeDay > 0 ? 'green' : 'red'

    const component = data ? (
      <div>
        <p>{pair}</p>
        <p>Last price: {lastPrice}</p>
        <p>% Change: <span style={{color: colorStyle, fontSize: '18px'}}>{percentChangeDay}</span></p>
        <p>Day volume: {numberFormat(dayVolume)}</p>
      </div>
    ) : 'Loading ticker'

    return (
      <TickerLayout>
        <h3>Ticker</h3>
        {component}
      </TickerLayout>
    )
  }
}
