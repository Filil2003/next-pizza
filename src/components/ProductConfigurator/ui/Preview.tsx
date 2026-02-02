import Image from "next/image";
import { cn } from "#/shared/lib/tailwind";

/* ===== Typing props ===== */
interface Props {
  name: string;
  src: string;
  diameter?: string;
}

/* ===== Preview component ===== */
export function Preview({ name, diameter, src }: Props) {
  return (
    <div className="grid content-center h-full bg-secondary">
      <div className="grid place-items-center relative aspect-square">
        {diameter && (
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
        )}

        <figure
          className={cn("relative transition-size duration-300 size-[85%]", {
            "size-[52%]": diameter === "20 см",
            "size-[66%]": diameter === "25 см",
            "size-[80%]": diameter === "30 см",
            "size-[94%]": diameter === "35 см"
          })}
        >
          <Image
            className={cn({
              "transform translate-[2.5%]": diameter
            })}
            src={src}
            alt={name}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 500px"
            fill
          />
        </figure>
      </div>
    </div>
  );
}
