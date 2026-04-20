export function cls(...classes: Array<string | undefined | false>): string {
  return classes.filter(Boolean).join(' ');
}
