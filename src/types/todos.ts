export type TTodo = {
  ID: number;
  Title: string;
  Description: string;
  Done: boolean;
  DueAt: string;
  DoneTime: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
};

export type TEditTodo = {
  id: number;
  title: string;
  description: string;
  dueat?: string;
};
