import Image from 'next/image';

import type IImage from './interfaces/IImage';

function ImageComponent({
  src, alt, width, height,
  fill, sizes, priority, quality,
  className, loading,
}:IImage) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      fill={fill}
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
      draggable="false"
      loading={loading}
    />
  );
}
export default ImageComponent;
