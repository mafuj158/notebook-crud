import { User } from "./user.type";

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  userId?: string;
  user?: User;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CreateNoteInput {
  title: string;
  content: string;
  tags?: string[];
}

export interface UpdateNoteInput {
  title?: string;
  content?: string;
  tags?: string[];
}
