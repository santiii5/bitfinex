import styled, {css} from 'styled-components'

export const color = '#061a44'
export const color2 = '#010e2c'
export const color3 = '#0dd20d'

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
  padding: 5px;
  justify-items: right;

  .amount {
    color: red;
  }

  div:first-child {
    justify-self: left;
  }

  ${props => props.positiveAmount && css`
    .amount {
      color: ${color3};
    }
  `}

  ${props => props.header && css`
    font-size: 18px;
    color: yellow;
    font-weight: bold;
  `}

  &:last-child {
    border-bottom: none;
  }
`

export const Button = styled.button`
  padding: 5px;
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

  ${props => props.disabled && css`
    pointer-events: none;
    opacity: 0.4;
  `}
`

export const ComponentHeader = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-gap: 15px;
  width: 100%;
  background-color: #fcfcfd;
  padding: 10px 0 10px 10px;
  border-radius: 2px 2px 0 0;
  color: #00131e;
  box-sizing: border-box;
`

export const ComponentContent = styled.div`
  border-radius: 0 0 2px 2px;
  padding: 10px 15px;
  background-color: #454e65;
`
