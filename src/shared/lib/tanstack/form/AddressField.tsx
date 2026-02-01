import {
  AddressSuggestions,
  type DaDataAddress,
  type DaDataSuggestion
} from "react-dadata";
import { Field, FieldError, FieldLabel, Input } from "#/shared/ui";
import { useFieldContext } from "./context.tsx";

/* ===== Typing props ===== */
interface Props {
  label: string;
}

/* ===== AddressField component ===== */
export function AddressField({ label }: Props) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field
      className="grid grid-cols-subgrid col-span-2"
      orientation="horizontal"
      data-invalid={isInvalid}
    >
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
      <AddressSuggestions
        value={field.state.value as unknown as DaDataSuggestion<DaDataAddress>}
        customInput={Input}
        inputProps={{
          id: field.name,
          name: field.name,
          autoComplete: "off",
          "aria-invalid": isInvalid,
          onBlur: field.handleBlur
        }}
        selectOnBlur
        onChange={(data) => field.handleChange(data?.value ?? "")}
        token={process.env.NEXT_PUBLIC_DADATA_TOKEN ?? ""}
      />
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  );
}
