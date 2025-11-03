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

export const componentRegistry: ComponentRegistry = {
  layout: {
    name: 'Layout',
    templates: {
      div: {
        label: 'Div Container',
        icon: 'fa-solid fa-square',
        template:
          '<div></div>',
      },
      'page-a4': {
        label: 'A4 Page',
        icon: 'fa-solid fa-file',
        template: '<PageA4 style="padding: 3mm 15mm 3mm 15mm;">New Page Content</div></PageA4>',
      },
      'page-a5': {
        label: 'A5 Page',
        icon: 'fa-solid fa-file',
        template: '<PageA5 style="padding: 3mm 15mm 3mm 15mm;">New Page Content</div></PageA5>',
      },
      // Grid Layouts
      'grid-2-cols': {
        label: '2 Columns Grid',
        icon: 'fa-solid fa-grip',
        template: `
        <div class="grid grid-cols-2 gap-1"></div>
      `,
      },
      'grid-3-cols': {
        label: '3 Columns Grid',
        icon: 'fa-solid fa-grip',
        template: `
        <div class="grid grid-cols-3 gap-1"></div>
      `,
      },
      'grid-4-cols': {
        label: '4 Columns Grid',
        icon: 'fa-solid fa-grip',
        template: `
        <div class="grid grid-cols-4 gap-1"></div>
      `,
      }
    },
  },
  basic: {
    name: 'Basic',
    templates: {
      button: {
        label: 'Button',
        icon: 'fa-solid fa-button',
        template:
          '<button style="padding: 8px 16px; margin: 5px 0; background: #007bff; color: white; border: none; border-radius: 4px;">Button</button>',
      },
      paragraph: {
        label: 'Paragraph',
        icon: 'fa-solid fa-paragraph',
        template:
          '<p style="margin: 5px 0; padding: 5px;">New paragraph text</p>',
      },
    },
  },
  form: {
    name: 'Form',
    templates: {
      input: {
        label: 'Text Input',
        icon: 'fa-solid fa-font',
        template:
          '<input type="text" placeholder="Enter text..." style="padding: 8px; margin: 5px 0; border: 1px solid #ccc; border-radius: 4px;" />',
      },
      textarea: {
        label: 'Text Area',
        icon: 'fa-solid fa-font',
        template: `<Textarea v-model="data.fullName" label="Họ và tên:" :line="true" :suffix="{ length: 1, char: '❤️' }" />`,
      },
      'input-otp': {
        label: 'OTP Input',
        icon: 'fa-solid fa-key',
        template: `<InputOTP v-model="data.age" :maskLength="[1,1,1]" pad-start="0" />`,
      },
    },
  },
  text: {
    name: 'Text',
    templates: {
      heading1: {
        label: 'Heading 1',
        icon: 'fa-solid fa-heading',
        template: '<h1 style="margin: 10px 0; font-size: 24px;">Heading 1</h1>',
      },
      heading2: {
        label: 'Heading 2',
        icon: 'fa-solid fa-heading',
        template: '<h2 style="margin: 8px 0; font-size: 20px;">Heading 2</h2>',
      },
      list: {
        label: 'List',
        icon: 'fa-solid fa-list',
        template:
          '<ul style="margin: 5px 0; padding-left: 20px;"><li>List item 1</li><li>List item 2</li></ul>',
      },
    },
  },
  media: {
    name: 'Media',
    templates: {
      image: {
        label: 'Image',
        icon: 'fa-solid fa-image',
        template:
          '<img src="/src/assets/img/icon/image.png" alt="Image" style="max-width: 100%; margin: 5px 0;" />',
      },
    },
  },
};
