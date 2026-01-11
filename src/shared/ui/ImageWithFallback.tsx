"use client";

import Image from "next/image";
import { type ComponentProps, useLayoutEffect, useState } from "react";

/* ===== Typing props ===== */
interface Props extends ComponentProps<typeof Image> {
  fallbackSrc: string;
}

/* ===== ImageWithFallback component ===== */
export function ImageWithFallback({
  src,
  fallbackSrc,
  onError,
  ...restProps
}: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  useLayoutEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...restProps}
      src={imgSrc}
      onError={(event) => {
        setImgSrc(fallbackSrc);
        onError?.(event);
      }}
    />
  );
}
