import Image from "next/image";

interface RankCardProps {
  rank: string | number;
  title: string;
  imageUrl: string;
}

export function RankCard({ rank, title, imageUrl }: RankCardProps) {
  return (
    <div className="flex w-[200px] h-[250px] cursor-pointer relative p-2 overflow-visible shrink-0">
      {/* Left Side (rank + rotated title) */}
      <div className="flex flex-col justify-end">
        <p className="absolute bottom-7 left-4 text-md rotate-[-90deg] origin-left whitespace-nowrap text-white">
          {title}
        </p>
        <span className="text-md z-10 text-white text-center mr-2">{rank}</span>
      </div>

      {/* Image Section */}
      <div className="w-full h-full bg-white rounded-xl overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          width={500}   // adjust as needed
          height={500}  // adjust as needed
          className="w-full h-full object-cover"
          
        />
      </div>
    </div>
  );
}