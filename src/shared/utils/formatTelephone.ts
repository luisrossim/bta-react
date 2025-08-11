export const formatTelefone = (str: string): string => {
  const digits = str.replace(/\D/g, '');

  const formatted = digits.replace(
    /^(\d{2})(\d{5})(\d{4})$/,
    '($1) $2-$3'
  );

  return formatted;
};