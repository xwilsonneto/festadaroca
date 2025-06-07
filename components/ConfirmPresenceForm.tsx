"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ConfirmPresenceForm() {
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ name, guests });
    alert("Presença confirmada! 🎊");
    // Aqui você salvaria no backend ou planilha
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Confirmar Presença</h2>
      <div>
        <Label htmlFor="name">Seu nome</Label>
        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="guests">Quem mais vem com você? (nomes ou número)</Label>
        <Input id="guests" value={guests} onChange={(e) => setGuests(e.target.value)} />
      </div>
      <Button type="submit">Confirmar 🎯</Button>
    </form>
  );
}
