export const shuffleArray = <T>(arr: T[]): T[] => {
  const newArr = [...arr]; // copy để không mutate mảng gốc

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
}