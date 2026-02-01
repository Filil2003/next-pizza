import {
  createFormHook,
  createFormHookContexts
} from "@tanstack/react-form-nextjs";
import { AddressField } from "./AddressField.tsx";
import { FormField } from "./FormField.tsx";
import { SubmitButton } from "./SubmitButton.tsx";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    AddressField,
    FormField
  },
  formComponents: {
    SubmitButton
  }
});
