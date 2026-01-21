import { Dialog, DialogContent } from "@/components/dialog";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAddJournal } from "@/services/apiJournals";
import { Plus } from "lucide-react";
import { useState } from "react";

function JournalButtons() {
  const [isCreating, setIsCreating] = useState(false);
  const [journalForm, setJournalForm] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });

  const { mutate: handleAddJournal } = useAddJournal();

  function handleSubmit() {
    handleAddJournal({
      title: journalForm.title,
      content: journalForm.content,
    });

    setJournalForm({ title: "", content: "" });
  }

  return (
    <div className="md:col-start-2 lg:col-span-3">
      <div className="flex w-full justify-end gap-2">
        <Button className="cursor-pointer">My Journals</Button>
        <Button
          className="cursor-pointer"
          onClick={() => setIsCreating(!isCreating)}
        >
          <Plus /> <span>Create journal</span>
        </Button>
      </div>

      <Dialog open={isCreating} onOpenChange={() => setIsCreating(!isCreating)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Journal</DialogTitle>
            <DialogDescription>
              Write your feelings, emotions, or thoughts.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                className="field-sizing-fixed w-full text-base"
                type="text"
                value={journalForm.title}
                onChange={(e) =>
                  setJournalForm((prev) => {
                    return { ...prev, title: e.target.value };
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                title="content"
                className="field-sizing-fixed min-h-72 w-full resize-none text-sm"
                value={journalForm.content}
                onChange={(e) =>
                  setJournalForm((prev) => {
                    return { ...prev, content: e.target.value };
                  })
                }
              />
            </div>
            <Button className="w-full cursor-pointer" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default JournalButtons;
