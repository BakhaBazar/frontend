const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND;

export default async function ArtificialIntelligencePage() {
  return (
    <div className="lg:col-span-2 flex flex-col gap-6 min-w-[300px] h-[calc(100vh-16rem)] overflow-y-auto scroll-smooth no-scroll mt-3 lg:mt-0 pt-5 pl-5">
      <div className="h-[110%] rounded-xl shadow-4xl border-2 border-white">
        {/* Content here */}
      </div>
    </div>
  );
}
