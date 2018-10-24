import React from 'react'
import PropTypes from 'prop-types'
import { Button, SocketControl, SocketStatus } from '../Style'

export default class SocketOptions extends React.Component {
  static propTypes = {
    startSocket: PropTypes.func.isRequired,
    stopSocket: PropTypes.func.isRequired,
    startText: PropTypes.string,
    stopText: PropTypes.string,
    socketText: PropTypes.string,
    status: PropTypes.bool,
	}

  static defaultProps = {
		startText: 'Start',
    stopText: 'Stop',
    socketText: 'Socket',
    status: false,
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
      socketText,
      status,
    } = this.props

    return (
      <SocketControl>
        <Button className="btn--green" onClick={this.onSocket.bind(this)} disabled={status}>{startText}</Button>
        <Button className="btn--red" onClick={this.offSocket.bind(this)} disabled={!status}>{stopText}</Button>
        <SocketStatus status={status}>{socketText} status</SocketStatus>
      </SocketControl>
    )
  }
}
