export const NumberWithDot = (x, floating = 0, locale = "id-ID") => {  
  if (typeof x === 'undefined') { x = 0; }
  x = parseFloat(x).toFixed(floating);

  return x.toLocaleString("id-ID").toString();  
}

export const NumberFormat = (labelValue, floating = 0) => {  
  return Math.abs(Number(labelValue)) >= 1.0e12
    ? NumberWithDot((Math.abs(Number(labelValue)) / 1.0e12), floating) + " T"
    : Math.abs(Number(labelValue)) >= 1.0e9
    ? NumberWithDot((Math.abs(Number(labelValue)) / 1.0e9), floating) + " B"
    : Math.abs(Number(labelValue)) >= 1.0e6
    ? NumberWithDot((Math.abs(Number(labelValue)) / 1.0e6), floating) + " M"
    : Math.abs(Number(labelValue)) >= 1.0e3
    ? NumberWithDot((Math.abs(Number(labelValue)) / 1.0e3), floating) + " K"
    : Math.abs(Number(labelValue)).toFixed(0);
}

export default {
  NumberWithDot,
  NumberFormat
}