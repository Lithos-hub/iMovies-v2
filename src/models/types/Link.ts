export type Link = {
  name: string;
  path?: string;
  icon?: string;
  action?(): void;
};
