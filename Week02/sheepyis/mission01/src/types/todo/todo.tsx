export type SectionType = "todo" | "doneTodo";

export interface TodoItem {
  id: number;
  text: string;
  type: SectionType;
}
