import { useId } from "react";
import { Checkbox } from "#/shared/ui";

/* ===== Typing props ===== */
interface Props {
  label: string;
  value: string;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
}

/* ===== FilterCheckbox component ===== */
export function FilterCheckbox({ label, ...restProps }: Props) {
  const checkboxId = useId();
  return (
    <div className="flex items-center space-x-2">
      <Checkbox className="rounded-lg w-6 h-6" id={checkboxId} {...restProps} />
      <label
        className="leading-none cursor-pointer flex-1"
        htmlFor={checkboxId}
      >
        {label}
      </label>
    </div>
  );
}
