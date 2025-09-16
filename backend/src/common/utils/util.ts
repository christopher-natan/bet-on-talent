
// Miscellaneous string utilities.
export function capitalizeName(value: string): string {
  if (!value) return value;
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const cap = (part: string) =>
    part.length === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
  // Title-case words and hyphenated parts while preserving spaces and hyphens
  return trimmed
    .split(' ')
    .map((segment) => segment.split('-').map(cap).join('-'))
    .join(' ');
}
