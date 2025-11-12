import PlayBarLeft from "./PlayBarLeft";
import PlayBarCenter from "./PlayBarCenter";
import PlayBarRight from "./PlayBarRight";

export default function PlayBar() {

  return (
    <div
      className="
        flex flex-col sm:flex-col md:flex-row lg:flex-row align-center
        items-center md:justify-between 
        px-4 py-4 bg-tertiary-background text-secondary-text 
        w-full absolute bottom-0 rounded-b-xl z-20
        gap-3 sm:gap-4 min-h-24
      "
    >
      <PlayBarLeft />
      <PlayBarCenter />
      <PlayBarRight />
    </div>
  );
}
