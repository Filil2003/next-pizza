import { cn } from "#/shared/lib/tailwind";
import { Field, FieldError, FieldLabel, Input } from "#/shared/ui";
import { useFieldContext } from "./context.tsx";

/* ===== Typing props ===== */
interface Props {
  label: string;
  className?: string;
}

/* ===== FormField component ===== */
export function FormField({ label, className }: Props) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field
      className={cn("grid grid-cols-subgrid col-span-2", className)}
      orientation="horizontal"
      data-invalid={isInvalid}
    >
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <Input
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        aria-invalid={isInvalid}
        autoComplete="off"
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
