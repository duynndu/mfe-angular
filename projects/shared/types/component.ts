export interface ComponentDefinition {
  label: string;
  icon: string;
  template: string;
}

export interface ComponentCategory {
  name: string;
  templates: {
    [key: string]: ComponentDefinition;
  };
}

export interface ComponentRegistry {
  [category: string]: ComponentCategory;
}