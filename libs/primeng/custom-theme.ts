import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura'

export const PrefixTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A',
      950: '#172554'
    },
    components: {
      button: {
        root: {
          borderRadius: '{borderRadius.sm}',
          paddingX: '1rem',
          paddingY: '0.625rem',
          gap: '0.5rem'
        },
        colorScheme: {
          primary: {
            background: '{primary.50}',
            borderColor: '{primary.50}',
            color: '{primary.500}',
            hoverBackground: '{primary.500}',
            hoverBorderColor: '{primary.500}',
            hoverColor: '#ffffff',
            activeBackground: '{primary.600}',
            activeBorderColor: '{primary.600}',
            activeColor: '#ffffff',
            focusRing: {
              color: '{primary.500}',
              shadow: '0 0 0 0.2rem {primary.200}'
            }
          },
          secondary: {
            background: '{surface.100}',
            borderColor: '{surface.100}',
            color: '{surface.700}',
            hoverBackground: '{surface.200}',
            hoverBorderColor: '{surface.200}',
            hoverColor: '{surface.800}'
          }
        },
        outlined: {
          primary: {
            background: 'transparent',
            borderColor: '{primary.500}',
            color: '{primary.500}',
            hoverBackground: '{primary.50}',
            hoverBorderColor: '{primary.500}',
            hoverColor: '{primary.600}'
          }
        },
        text: {
          primary: {
            background: 'transparent',
            borderColor: 'transparent',
            color: '{primary.500}',
            hoverBackground: '{primary.50}',
            hoverBorderColor: 'transparent',
            hoverColor: '{primary.600}'
          }
        }
      },
      textarea: {
        root: {
          borderRadius: '4px'
        }
      },
      inputtext: {
        root: {
          borderRadius: '4px'
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
