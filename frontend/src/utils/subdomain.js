export function getSubdomain() {
  const host = window.location.hostname; // ex: mclaren.cheersexpress.com
  const parts = host.split(".");
  if (parts.length > 2) return parts[0];
  // Em desenvolvimento local, defina manualmente:
  return "teste"; // mude para "mclaren" após criar a empresa
}
