import "server-only";
import StripePaymentInitiation from "~/app/_components/Pay-stripe";

export default async function pay() {
  return (
    <main className="relative flex h-screen w-full justify-center overflow-hidden">
      <div className="flex flex-wrap lg:items-center">
        <div className="w-full p-8 md:w-1/2 lg:p-14">
          <div className="md:max-w-sm">
            <p className="text-primary tracking-px mb-8 whitespace-nowrap font-sans text-sm font-semibold uppercase">
              👋 Kosomak
            </p>
            <StripePaymentInitiation />
          </div>
        </div>
      </div>
    </main>
  );
}
