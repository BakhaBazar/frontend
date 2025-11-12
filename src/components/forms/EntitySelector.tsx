"use client";
import React, { useState, useEffect } from "react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

interface Entity {
  name: string;
  uuid: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_CLIENT_URL;

export default function EntitySelector({
  selectedEntities,
  setSelectedEntities,
}: {
  selectedEntities: string[];
  setSelectedEntities: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/entity/`);
        if (!res.ok) throw new Error("Failed to fetch entities");

        const data: Entity[] = await res.json();
        // Ensure only name + uuid are kept
        const formatted = data.map((e) => ({
          name: e.name,
          uuid: e.uuid,
        }));

        setEntities(formatted);
      } catch (error) {
        console.error("Error fetching entities:", error);
      }
    };
    fetchEntities();
  }, []);

  const toggleEntity = (uuid: string) => {
    setSelectedEntities((prev) =>
      prev.includes(uuid) ? prev.filter((e) => e !== uuid) : [...prev, uuid]
    );
  };

  const filtered = entities.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="block mb-20">
      <Label className="text-primary-text text-sm mb-2 block">
        Related Entities
      </Label>

      <Command className="rounded-lg border border-highlight bg-input-background max-h-48 overflow-y-auto text-primary-text">
        <CommandInput
          placeholder="Search entities..."
          value={search}
          onValueChange={setSearch}
        />

        <CommandList>

          <CommandGroup heading="Available Entities">
            {filtered.map((entity) => (
              <CommandItem
                key={entity.uuid}
                onSelect={() => toggleEntity(entity.uuid)}
                className="cursor-pointer hover:bg-input-background/90 text-primary-text"
              >
                <div className="flex items-center justify-between w-full">
                  <span>{entity.name}</span>
                  {selectedEntities.includes(entity.uuid) && <Check size={14} />}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

        </CommandList>
      </Command>

      {selectedEntities.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedEntities.map((uuid) => {
            const entity = entities.find((e) => e.uuid === uuid);
            return (
              <span
                key={uuid}
                className="flex items-center gap-1 bg-emerald-700/30 border border-emerald-600 text-emerald-300 text-sm px-2 py-1 rounded-full"
              >
                {entity ? entity.name : uuid}
                <X
                  size={14}
                  className="cursor-pointer hover:text-emerald-200"
                  onClick={() =>
                    setSelectedEntities((prev) => prev.filter((e) => e !== uuid))
                  }
                />
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
