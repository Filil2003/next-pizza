import { useState } from "react";
import { cn } from "#/shared/lib/tailwind";
import { ToggleGroup } from "#/shared/ui";

/* ===== Typing props ===== */
interface Props {
  className?: string;
}

type Crust = "traditional" | "thin";

/* ===== CrustPicker component ===== */
export function CrustPicker({ className }: Props) {
  const [crust, setCrust] = useState<Crust>("traditional");

  return (
    <section className={cn("", className)}>
      <h2 className="sr-only">Тесто</h2>
      <ToggleGroup
        options={[
          { label: "Традиционное", value: "traditional" },
          { label: "Тонкое", value: "thin" }
        ]}
        value={crust}
        onChange={setCrust}
      />
    </section>
  );
}
