export const convertTime = (seconds: number) => {
  const hour = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const second = seconds % 60;

  const textHour = hour > 0 ? `${hour}h ` : "";
  const textMinute = `${minutes}m `;
  const textSecond = `${second}s`;

  return textHour + textMinute + textSecond;
};
