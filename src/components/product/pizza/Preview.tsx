import Image from "next/image";
import { useState } from "react";
import { cn } from "#/shared/lib/tailwind";

/* ===== Typing props ===== */
interface Props {
  name: string;
  slug: string;
  crust: "traditional" | "thin";
  size: "small" | "medium" | "large" | "xlarge";
  className?: string;
}

/* ===== Preview component ===== */
export function Preview({ name, slug, crust, size, className }: Props) {
  const [currentSize, setCurrentSize] = useState(size);

  return (
    <div
      className={cn(
        "grid place-items-center relative aspect-square",
        className
      )}
    >
      <svg
        className="absolute inset-0"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* Small circle */}
        <circle
          cx="50"
          cy="50"
          r="23.5"
          strokeLinecap="round"
          strokeDasharray="2"
          strokeWidth="0.5"
          className="fill-none stroke-gray-200"
        />

        {/* Medium circle */}
        <circle
          cx="50"
          cy="50"
          r="30"
          strokeLinecap="round"
          strokeDasharray="2"
          strokeWidth="0.5"
          className="fill-none stroke-gray-200"
        />

        {/* Large circle */}
        <circle
          cx="50"
          cy="50"
          r="36.5"
          strokeLinecap="round"
          strokeDasharray="2"
          strokeWidth="0.5"
          className="fill-none stroke-gray-200"
        />

        {/* XLarge circle */}
        <circle
          cx="50"
          cy="50"
          r="43"
          strokeLinecap="round"
          strokeDasharray="2"
          strokeWidth="0.5"
          className="fill-none stroke-gray-200"
        />
      </svg>
      <figure
        className={cn("relative transition-size duration-300", {
          "size-[52%]": currentSize === "small",
          "size-[66%]": currentSize === "medium",
          "size-[80%]": currentSize === "large",
          "size-[94%]": currentSize === "xlarge"
        })}
      >
        <Image
          className={cn("transform translate-[2.5%]")}
          src={`/pizza/catalog/${slug}/${size}-${crust}.png`}
          alt={name}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 500px"
          fill
          onLoad={() => setCurrentSize(size)}
        />
      </figure>
    </div>
  );
}
