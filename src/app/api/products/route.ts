import { NextResponse } from "next/server";
import getProducts from "@/queries/getProducts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  const products = await getProducts({ search });
  return NextResponse.json(products);
}
