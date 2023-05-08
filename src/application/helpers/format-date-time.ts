export const formatDateTime = (date: Date = new Date()): string =>
  new Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(
    new Date(date)
  );

export const formatTime = (time: string): string => {
  let formattedTime = '';
  const [hour, min, sec] = time.split(':');

  if (Number(hour) > 0) {
    formattedTime += `${Number(hour)} horas, `;
    formattedTime += `${Number(min)} minutos e `;
  } else if (Number(min) > 0) formattedTime += `${Number(min)} minutos e `;

  formattedTime += `${Number(sec)} segundos`;
  return formattedTime;
};
