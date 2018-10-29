import React from 'react'
import PropTypes from 'prop-types'
import SocketOptions from './SocketOptions'
import Container from '../containers/container'
import styled from 'styled-components'
import { numberFormat, numberWithCommas } from '../helpers/utils'
import { ComponentHeader, ComponentContent, color3 } from '../Style'

const TickerLayout = styled.div`
  p {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    border-bottom: 1px solid white;
    margin: 0;
    border-bottom: 1px solid #7887a9;
    padding: 15px 0;

    &:last-child {
      border-bottom: none;
    }

    span {
      text-align: right;
    }
  }
`

const Price = styled.span`
  font-size: 22px;
  color: ${color3};
  font-weight: bold;
`
export default class Ticker extends Container {
  static propTypes = {
		data: PropTypes.array,
    pair: PropTypes.string,
    startWebsocket: PropTypes.func.isRequired,
    stopWebsocket: PropTypes.func.isRequired,
    socketText: PropTypes.string,
    status: PropTypes.bool,
	}

  static defaultProps = {
		data: null,
	}

  render() {
    const {
      pair,
      startWebsocket,
      stopWebsocket,
      socketText,
      status,
    } = this.props

    const data = this.props.data || {}
    let lastPrice
    let percentChangeDay
    let dayVolume
    let component = 'Loading ticker'

    if (data.length > 0) {
      lastPrice = numberWithCommas(data[6].toFixed(2))
      percentChangeDay = data[5]
      dayVolume = data[7]
      const colorStyle = percentChangeDay > 0 ? 'green' : 'red'

      component = (
        <div>
          <p><b>{pair}</b></p>
          <p>Last price: <Price>${lastPrice}</Price></p>
          <p>% Change 24h: <span style={{color: colorStyle, fontSize: '18px'}}>{percentChangeDay}</span></p>
          <p>24h volume: <span>{numberWithCommas(numberFormat(dayVolume))}</span></p>
        </div>
      )
    }

    return (
      <TickerLayout>
        <ComponentHeader>
          <h3>Ticker</h3>
          <SocketOptions
            startSocket={startWebsocket.bind(this)}
            stopSocket={stopWebsocket.bind(this)}
            socketText={socketText}
            status={status}
          />
        </ComponentHeader>
        <ComponentContent>
          {component}
        </ComponentContent>
      </TickerLayout>
    )
  }
}
