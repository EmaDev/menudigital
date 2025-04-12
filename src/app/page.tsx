import { Toaster } from "react-hot-toast";
import AuthGate from "@/components/AuthGate";

export default async function Home() {

  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
      <AuthGate />;
    </>
  )
}
