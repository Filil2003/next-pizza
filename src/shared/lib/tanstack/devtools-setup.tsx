import { TanStackDevtools } from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";

export default function Devtools() {
  return (
    <TanStackDevtools
      plugins={[
        {
          name: "TanStack Query",
          render: <ReactQueryDevtoolsPanel />,
          defaultOpen: true
        },
        formDevtoolsPlugin()
      ]}
    />
  );
}
