import "server-only";

export default async function Test() {

  return (
    <main className="overflow-hidden w-full h-screen relative flex justify-center">

      <div className="flex flex-wrap lg:items-center">
        <div className="w-full md:w-1/2 p-8 lg:p-14">
          <div className="md:max-w-sm">
            <p className="mb-8 font-sans text-sm text-primary font-semibold uppercase tracking-px whitespace-nowrap">
              👋 Kosomak
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
