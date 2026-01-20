import { cn } from "#/shared/lib/tailwind";

/* ===== Typing props ===== */
interface Props<T extends string | number> {
  options: {
    label?: string;
    value: T;
    isDisabled?: boolean;
  }[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/* ===== ToggleGroup component ===== */
export function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
  className
}: Props<T>) {
  return (
    <div
      className={cn(
        "grid grid-flow-col auto-cols-fr bg-gray-100 rounded-full p-1",
        className
      )}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "p-1 text-sm font-semibold text-center rounded-full cursor-pointer select-none",
            {
              "bg-white shadow": option.value === value,
              "text-gray-500 opacity-50 pointer cursor-not-allowed":
                option.isDisabled
            }
          )}
        >
          <input
            type="radio"
            value={option.value}
            checked={option.value === value}
            onChange={() => {
              if (!option.isDisabled) onChange(option.value);
            }}
            disabled={option.isDisabled}
            className="sr-only"
          />
          {option.label ?? option.value}
        </label>
      ))}
    </div>
  );
}
