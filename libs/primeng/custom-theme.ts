import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura'

export const PrefixTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#EFF6FF',
      500: '#3B82F6'
    },
    components: {
      button: {
        colorScheme: {
          primary: {
            background: '{primary.50}',
            hoverBackground: '{primary.500}',
            borderColor: '{primary.50}',
            hoverBorderColor: '{primary.500}',
            textColor: '{primary.500}',
            hoverTextColor: '#ffffff'
          }
        }
      }
    },
    borderRadius: {
      small: '4px',
      medium: '8px',
      large: '16px'
    },
    focusRing: {
      width: '2px',
      style: 'dashed',
      color: '{primary.500}',
      offset: '1px'
    }
  }
});
