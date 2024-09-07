// Import the redirect function from Next.js
import { redirect } from "next/navigation";

export default function HomePage() {
  // Automatically redirect to /your-wallet
  redirect("/your-wallet");
}
