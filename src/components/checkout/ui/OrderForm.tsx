"use client";

import { useMutation } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import * as z from "zod";
import { cn } from "#/shared/lib/tailwind";
import { useAppForm } from "#/shared/lib/tanstack/form";
import { FieldGroup, FieldSet } from "#/shared/ui";
import { mutations } from "../api";

/* ===== Typing props ===== */
interface Props extends ComponentProps<"form"> {
  className?: string;
}

/* ===== Validation schema ===== */
const formSchema = z.object({
  name: z.string().min(1, { message: "Введите имя" }),
  email: z
    .email({ message: "Некорректный email" })
    .min(1, { message: "Введите email" }),
  phone: z
    .string()
    .min(1, { message: "Введите телефон" })
    .regex(/^\+?[\d\s-()]{10,15}$/, { message: "Неверный формат телефона" }),
  address: z.string().min(1, { message: "Введите адрес доставки" }),
  entrance: z.string().optional(),
  floor: z.coerce.number().optional(),
  apartment: z.string().optional(),
  entryCode: z.string().optional(),
  note: z.string().max(256, { message: "Не более 256 символов" }).optional()
});

/* ===== OrderForm component ===== */
export function OrderForm({ className }: Props) {
  const paymentMutation = useMutation(mutations.createPayment());
  const { AppForm, AppField, SubmitButton, handleSubmit } = useAppForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: ""
    },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      paymentMutation.mutate(value);
    }
  });

  return (
    <form
      className={cn("", className)}
      onSubmit={(event) => {
        event.preventDefault();
        void handleSubmit();
      }}
    >
      <AppForm>
        {/* ===== Personal info ===== */}
        <FieldSet>
          <FieldGroup className="grid grid-cols-[auto_1fr]">
            <AppField
              name="name"
              children={({ FormField }) => <FormField label="Имя" />}
            />
            <AppField
              name="email"
              children={({ FormField }) => <FormField label="Email" />}
            />
            <AppField
              name="phone"
              children={({ FormField }) => <FormField label="Телефон" />}
            />
            <AppField
              name="address"
              children={({ AddressField }) => (
                <AddressField label="Адрес доставки" />
              )}
            />
          </FieldGroup>
        </FieldSet>
        <div className="flex mt-4">
          <SubmitButton className="ml-auto w-1/3 text-lg">
            Перейти к оплате
          </SubmitButton>
        </div>
      </AppForm>
    </form>
  );
}
