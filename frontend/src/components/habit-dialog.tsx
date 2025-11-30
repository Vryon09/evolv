"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IHabit } from "types/habit";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Check, Plus, X } from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useAddHabit, useUpdateHabit } from "@/services/apiHabits";
import { getTags, useAddTag } from "@/services/apiTags";
import { useQuery } from "@tanstack/react-query";

interface HabitDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  habit?: IHabit | null;
}

type Frequency = "daily" | "weekly" | "monthly";

interface FormDataTypes {
  title: string;
  frequency: Frequency;
  description: string;
  tags: string[];
}

const formDataInitialState = {
  title: "",
  description: "",
  frequency: "daily" as Frequency,
  tags: [],
};

export function HabitDialog({ open, onOpenChange, habit }: HabitDialogProps) {
  const [formData, setFormData] = useState<FormDataTypes>(formDataInitialState);

  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [newTag, setNewTag] = useState("");
  const { data: tags = [], isPending: isTagsLoading } = useQuery<string[]>({
    queryFn: getTags,
    queryKey: ["tags"],
  });

  const { mutate: handleAddHabit } = useAddHabit();
  const { mutate: handleUpdateHabit } = useUpdateHabit();
  const { mutate: handleAddTag } = useAddTag();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (habit) {
      handleUpdateHabit({ _id: habit._id, ...formData });
      setFormData(formDataInitialState);
      onOpenChange(false);
      return;
    }

    handleAddHabit(formData);
    setFormData(formDataInitialState);
    onOpenChange(false);
  }

  function addTag() {
    if (newTag === "" || formData.tags.length === 3) return;

    handleAddTag({ tag: newTag });
    setFormData((prev) => {
      return { ...prev, tags: [...prev.tags, newTag.toLowerCase()] };
    });
    setIsCreatingTag(false);
    setNewTag("");
  }

  useEffect(() => {
    if (habit) {
      setFormData({
        title: habit.title,
        description: habit.description ?? "",
        frequency: habit.frequency,
        tags: habit.tags,
      });
      return;
    }

    setFormData(formDataInitialState);
  }, [habit]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{habit ? "Edit Habit" : "Add New Habit"}</DialogTitle>
          <DialogDescription>
            {habit
              ? "Update your habit details below."
              : "Create a new habit to track your progress."}
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="title">Habit Title</Label>
            <Input
              id="title"
              placeholder="e.g., Morning Meditation"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="e.g., Meditate for 10 minutes"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) =>
                  setFormData({ ...formData, frequency: value as Frequency })
                }
              >
                <SelectTrigger id="frequency" className="cursor-pointer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              {formData.tags.length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  No tags selected
                </p>
              ) : (
                <div className="flex gap-2">
                  {formData.tags.map((tag, i) => (
                    <div
                      key={i}
                      className="group bg-accent flex items-center justify-between gap-2 rounded-xl px-1.5 py-0.5 text-xs capitalize"
                    >
                      <span className="cursor-default select-none">{tag}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setFormData((prev) => {
                            return {
                              ...prev,
                              tags: prev.tags.filter((t) => t !== tag),
                            };
                          });
                        }}
                        className="hover:bg-accent-foreground/20 hidden h-4 w-4 cursor-pointer items-center justify-center rounded-full group-hover:flex"
                      >
                        <X className="h-3 w-3" strokeWidth={3} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger disabled={isTagsLoading} asChild>
                  <Button
                    className="bg-accent flex cursor-pointer"
                    variant="ghost"
                    size="sm"
                  >
                    <Plus /> <span className="text-sm">Add Tag</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="border p-0">
                  {isCreatingTag ? (
                    <div className="p-2">
                      <div className="flex gap-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Enter tag name..."
                          autoFocus
                          className="h-8"
                        />
                        <Button size="sm" className="h-8 px-3" onClick={addTag}>
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <DropdownMenuItem
                      onSelect={(e) => {
                        e.preventDefault();
                        setIsCreatingTag(true);
                      }}
                      className="cursor-pointer"
                    >
                      <span className="flex items-center px-2 py-0.5 text-sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Create New Tag
                      </span>
                    </DropdownMenuItem>
                  )}
                  {tags.map((tag, i) => {
                    if (formData.tags.includes(tag.toLowerCase())) return;
                    return (
                      <div
                        key={i}
                        className="flex cursor-pointer border-b-1 p-1"
                      >
                        {/* <DropdownMenuSeparator /> */}
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onSelect={(e) => {
                            e.preventDefault();
                            if (formData.tags.length === 3) return;
                            setFormData((prev) => {
                              return {
                                ...prev,
                                tags: [...prev.tags, tag.toLowerCase()],
                              };
                            });
                          }}
                        >
                          <span className="bg-accent rounded-xl px-2 py-0.5 text-xs capitalize">
                            {tag}
                          </span>
                        </DropdownMenuItem>
                      </div>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer">
              {habit ? "Save Changes" : "Add Habit"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
