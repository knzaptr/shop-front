// app/payment/page.tsx

import PaymentDetails from "@/components/PaymentDetails";
import isAuthenticated from "@/middlewares/isAuthenticated";

export default async function PaymentPage() {
  const isAuth = await isAuthenticated();

  return <PaymentDetails isAuth={isAuth} />;
}
