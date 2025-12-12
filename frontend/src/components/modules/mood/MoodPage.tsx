import JournalCreate from "./JournalCreate";
import MoodForm from "./MoodForm";

function MoodPage() {
  return (
    <div className="bg-background overflow-scroll overflow-x-hidden">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <JournalCreate />
        <MoodForm />
      </div>
    </div>
  );
}

export default MoodPage;
