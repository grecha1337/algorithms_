export const fibIterative = (n: number): number[] => {
  if (n < 0) return [];

  let arr: number[] = [1, 1];
  for (let i = 2; i < n + 1; i++) {
    arr.push(arr[i - 2] + arr[i - 1])
  }
  return arr
}