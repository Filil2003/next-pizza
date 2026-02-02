import { type ComponentProps, type ReactNode, useId } from "react";
import { Checkbox } from "#/shared/ui";

/* ===== Typing props ===== */
interface Props extends ComponentProps<typeof Checkbox> {
  label: ReactNode;
}

/* ===== FilterCheckbox component ===== */
export function FilterCheckbox({ label, ...restProps }: Props) {
  const checkboxId = useId();
  return (
    <div className="flex items-center space-x-2">
      <Checkbox className="rounded-lg w-6 h-6" id={checkboxId} {...restProps} />
      <label
        className="leading-none cursor-pointer flex-1 select-none"
        htmlFor={checkboxId}
      >
        {label}
      </label>
    </div>
  );
}
