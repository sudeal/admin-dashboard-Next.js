"use client";

import { useParams } from "next/navigation";
import OrderDetailsPageView from "@/app/components/order-lists/OrderDetailsPageView";

export default function OrderDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ? String(params.id) : "";

  return <OrderDetailsPageView orderId={id} />;
}
