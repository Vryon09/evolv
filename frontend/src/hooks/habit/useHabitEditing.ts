import { useState } from "react";
import type { IHabit } from "types/habit";

export function useHabitEditing() {
  const [editingHabit, setEditingHabit] = useState<IHabit | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return { editingHabit, setEditingHabit, isDialogOpen, setIsDialogOpen };
}
