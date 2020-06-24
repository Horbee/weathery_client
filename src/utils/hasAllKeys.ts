export const hasAllKeys = (data: any, keys: string[]) => {
  return keys.every((key) => key in data);
};
