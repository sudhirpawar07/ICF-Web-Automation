export function isValidLink(href: string): boolean {
  return !(
    href.startsWith('#') ||
    href.startsWith('mailto') ||
    href.startsWith('tel')
  );
}