export const formatDate = (date: string | Date, isShort?: boolean) => {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    ...(isShort ? {} : { year: "numeric" }),
  }).format(new Date(date));
};
