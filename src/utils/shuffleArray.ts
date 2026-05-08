export const shuffleArray = <T>(arr: T[]): T[] => {
  const newArr = [...arr]; // copy để không mutate mảng gốc

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
}

export const pickRandom = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array]; // Copy mảng để không ảnh hưởng mảng gốc
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Hoán vị
  }
  return shuffled.slice(0, count);
};