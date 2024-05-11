import { useAuthStore } from "../store/auth.js";

export function DashboardPage() {
  const { token } = useAuthStore();

  console.log(token);

  return <div>dashboard page</div>;
}
