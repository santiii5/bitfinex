import React from 'react'
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'
import { Button, color3 } from '../Style'

export const SocketControl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 10px;
  grid-gap: 5px;

  ${props => props.header && css`
    grid-template-columns: 1fr 1fr;
    margin-top: 10px;
    height: 25px;
  `}
`

export const SocketStatus = styled.div`
  position: relative;
  font-size: 12px;
  text-align:right;

  &::after {
    position: absolute;
    right: 0;
    top: -10px;
    content: " ";
    width: 8px;
    height: 51px;
    border-radius: 0 2px 0 0;
    background-color: red;

    ${props => props.status && css`
      background-color: ${color3};
    `}
  }
`
export default class SocketOptions extends React.Component {
  static propTypes = {
    startSocket: PropTypes.func.isRequired,
    stopSocket: PropTypes.func.isRequired,
    startText: PropTypes.string,
    stopText: PropTypes.string,
    socketText: PropTypes.string,
    status: PropTypes.bool,
    header: PropTypes.bool,
	}

  static defaultProps = {
		startText: 'On',
    stopText: 'Off',
    socketText: 'Socket',
    status: false,
    header: false,
	}

  onSocket() {
    const {
      startSocket,
    } = this.props

    startSocket()
  }

  offSocket() {
    const {
      stopSocket,
    } = this.props

    stopSocket()
  }

  render() {
    const {
      startText,
      stopText,
      status,
      header,
    } = this.props
    const statusBar = header ? null : <SocketStatus status={status} />
    return (
      <SocketControl header={header}>
        <Button className="btn--green" onClick={this.onSocket.bind(this)} disabled={status}>{startText}</Button>
        <Button className="btn--red" onClick={this.offSocket.bind(this)} disabled={!status}>{stopText}</Button>
        {statusBar}
      </SocketControl>
    )
  }
}
