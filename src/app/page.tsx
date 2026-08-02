import { redirect } from "next/navigation";

import { env } from "@/config/env";

export default function RootPage() {
  redirect(`/${env.DEFAULT_MARKET}`);
}
