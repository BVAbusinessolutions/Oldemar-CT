/** Oculta todo excepto los últimos caracteres: "1-0234-0567" → "•••••••0567". */
export const maskValue = (value, visible = 4) => {
  if (!value) return '—';
  const str = String(value);
  if (str.length <= visible) return '•'.repeat(str.length);
  return '•'.repeat(str.length - visible) + str.slice(-visible);
};

export const maskEmail = (email) => {
  if (!email || !email.includes('@')) return maskValue(email);
  const [user, domain] = email.split('@');
  return `${user.slice(0, 1)}${'•'.repeat(Math.max(user.length - 1, 2))}@${domain}`;
};
