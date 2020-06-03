export const decimal = (num: number) =>
  Math.round((num + Number.EPSILON) * 10) / 10;
