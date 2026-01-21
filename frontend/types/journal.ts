export interface IJournal {
  _id: string;
  user: string;
  title: string;
  content: string;
  tags: string[];
  isArchived: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}
