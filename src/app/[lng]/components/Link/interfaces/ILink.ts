export default interface ILink {
  href: string,
  prefetch?: boolean,
  className?: string,
  target?: '_blank' | '_self' | '_parent' | '_top',
  rel?: string,
  ariaLabel?: string,
  children: React.ReactNode,
  id?: string,
}
