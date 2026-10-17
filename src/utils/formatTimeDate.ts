export const formatDate = (d: Date) =>
  `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;

export const formatTime = (d: Date) =>
  `${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;

export const formatDateTime = (d: Date) =>
  `${formatDate(d)} ${formatTime(d)}`;

// Tasks may contain a local HH:mm value or an ISO timestamp.
export const formatTaskTime = (value: string) => {
  if (/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) return value;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "—" : formatTime(date);
};
