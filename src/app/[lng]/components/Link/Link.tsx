import Link from 'next/link';

import type ILink from './interfaces/ILink';

function LinkComponent({
  href,
  prefetch = false,
  className = '',
  target = '_self',
  rel = '',
  ariaLabel = '',
  children,
  id,
}: ILink) {
  return (
    <Link
      id={id}
      href={href}
      prefetch={prefetch}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      draggable="false"
    >
      {children}
    </Link>
  );
}

export default LinkComponent;
