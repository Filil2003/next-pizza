import { toast } from "sonner";

/* ===== Typing props ===== */
interface Props {
  id: string | number;
  name: string;
  summary: string;
}

/* ===== CartToaster component ===== */
export function CartToaster({ name, summary }: Props) {
  return (
    <div className="min-w-62 py-4 px-5 text-sm font-bold text-white bg-[#373535]  rounded-xl opacity-95">
      <p>Добавлено:</p>
      <p>
        {name}, {summary}
      </p>
    </div>
  );
}

export function cartToast(props: Omit<Props, "id">) {
  return toast.custom((id) => <CartToaster id={id} {...props} />);
}
