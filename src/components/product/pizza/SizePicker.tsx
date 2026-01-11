import { useState } from "react";
import { cn } from "#/shared/lib/tailwind";
import { ToggleGroup } from "#/shared/ui";

/* ===== Typing props ===== */
interface Props {
  className?: string;
}

type Size = "small" | "medium" | "large" | "xlarge";

/* ===== SizePicker component ===== */
export function SizePicker({ className }: Props) {
  const [size, setSize] = useState<Size>("large");

  return (
    <section className={cn("", className)}>
      <h2 className="sr-only">Размер</h2>
      <ToggleGroup
        options={[
          { label: "20 см", value: "small" },
          { label: "25 см", value: "medium" },
          { label: "30 см", value: "large" },
          { label: "35 см", value: "xlarge" }
        ]}
        value={size}
        onChange={setSize}
      />
    </section>
  );
}
