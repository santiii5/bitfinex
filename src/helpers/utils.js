export const numberFormat = (number) => {
  return +(number + '').slice(0, 7)
}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
