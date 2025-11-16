export interface TemplateItem {
  label: string;
  icon: string;
  template: string;
  description?: string;
}

export interface TemplateCategory {
  label: string;
  templates: TemplateItem[];
  description?: string;
}