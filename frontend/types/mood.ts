export interface IMood {
  _id: string;
  user: string;
  mood: string;
  stressLevel: number;
  sleep: {
    bedTime: string;
    wakeTime: string;
    duration: number;
    quality: string;
  };
  habits: { habitId: string; isCompleted: boolean }[];
  isArchived: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}
