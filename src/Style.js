import styled, {css} from 'styled-components'

export const color = '#061a44'
export const color2 = '#010e2c'
export const color3 = '#053c18'

export const lightBlueBackground = `background-color: ${color}`
export const backgroundColor2 = `background-color: ${color2}`
export const greenBackgroundColor = `background-color: ${color3}`

export const fontColorGreen = `color: #03A9F4`
export const fontColorWhite = `color: white`
export const subtleBoxShadow = `box-shadow: 0px 0px 5px 1px #121d5b`
export const greenBoxShadow = `box-shadow: 0px 0px 4px 2px #5fff17`
export const redBoxShadow = `box-shadow: 0px 0px 2px 2px #e41111`


export const fontSizeBig = 'font-size: 2em';
export const fontSize1 = 'font-size: 1.5em';
export const fontSize2 = 'font-size: 1em';
export const fontSize3 = 'font-size: .75em';

export const textAlignCenter = 'ftext-align: center';

export const TableRow = styled.div`
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

export const Button = styled.button`
  padding: 8px 15px;
  font-size: 16px;
  border: none;
  border-radius: 3px;
  transition: 0.3s ease all;
  cursor: pointer;
  color: white;

  &:focus {
    outline: 0;
  }

  &.btn--green {
    background-color: #3e863e;

    &:hover {
      background-color: #199e19;
    }
  }

  &.btn--red {
    background-color: #ec4646;

    &:hover {
      background-color: #ec2323;
    }
  }
`

export const SocketControl = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 15px;
  margin-top: 20px;
`

export const SocketStatus = styled.div`
  position: relative;
  font-size: 12px;
  text-align:right;
  padding: 10px 20px 0 0;

  &::after {
    position: absolute;
    right: 0;
    top: 12px;
    content: " ";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;

    ${props => props.status && css`
      background-color: green;
    `}
  }
`
