export type Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "slug" | "number" | "boolean" | "date"
      | "select" | "image" | "images" | "tags" | "refs";
  /** select options */
  options?: { value: string; label: string }[];
  /** image/images storage folder */
  folder?: string;
  /** refs: collection to load {id, name} from */
  refCollection?: string;
  /** show this field as a table column */
  column?: boolean;
  required?: boolean;
  placeholder?: string;
};

export type EntityConfig = {
  collection: string;
  title: string;
  /** client-side sort field (default "order") */
  sortBy?: string;
  /** equality filter, e.g. platform == instagram (no composite index needed) */
  where?: { field: string; value: string };
  /** seeded into a new row */
  defaults?: Record<string, unknown>;
  fields: Field[];
};
