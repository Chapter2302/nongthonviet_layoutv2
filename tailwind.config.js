/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  theme: {

    textColor: theme => ({
      ...theme('colors'),
      maincolor: '#027731',
      hovercolor: '#006428',
    }),
    screens: {
      xs: { 'max': '767px' },
      sm: { 'min': '768px', 'max': '1018px' },
      md: { 'min': '1019px', 'max': '1140px' },
      lg: { 'min': '1141px' },
    },
    inset: {
      fiftyfive: '55px',
      twelve: "12px,"
    },
    variants: {},
    plugins: []
  }
}