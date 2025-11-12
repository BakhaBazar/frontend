import { Slider } from "@/components/ui/slider"

export function VolumeSlider() {
  return (
    <div className="w-24">
      <Slider 
        defaultValue={[75]} 
        max={100} 
        step={1} 
        className="[&_[role=slider]]:bg-highlight-light [&_[role=slider]]:border-0"
      />
    </div>
  )
}
