"use client";

import { useState } from "react";
import { foodOptions } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function FoodSelection() {
  const [selectedFood, setSelectedFood] = useState<{ name: string; type: "sweet" | "salty" } | null>(null);

  function handleSelect(type: "sweet" | "salty", name: string) {
    setSelectedFood({ type, name });
  }

  function handleConfirm() {
    if (!selectedFood) return;
    alert(`Você se comprometeu a trazer: ${selectedFood.name} 🍽️`);
    // Aqui você atualizaria a base de dados
  }

  return (
    <Card className="p-4 space-y-4 bg-[#fff3e0] border-[#ffcc80]">
      <h2 className="text-xl font-semibold">O que você vai trazer?</h2>

      {(["sweet", "salty"] as const).map((type) => (
        <div key={type}>
          <Label className="block mb-1">{type === "sweet" ? "🍬 Doces" : "🍢 Salgados"}</Label>
          <Select onValueChange={(value) => handleSelect(type, value)}>
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Escolha um item" />
            </SelectTrigger>
            <SelectContent>
              {foodOptions[type].map((item) => (
                <SelectItem key={item.name} value={item.name} disabled={item.current >= item.max}>
                  {item.name} ({item.max - item.current} restantes)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ))}

      <Button onClick={handleConfirm} disabled={!selectedFood}>
        Confirmar prato 🍽️
      </Button>
    </Card>
  );
}
