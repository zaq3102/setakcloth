import '@mui/material/styles/createPalette';

declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    color0?: PaletteColorOptions;
    color1?: PaletteColorOptions;
    color2?: PaletteColorOptions;
    color3?: PaletteColorOptions;
    color4?: PaletteColorOptions;
    color5?: PaletteColorOptions;
  }

  interface Palette {
    color0?: PaletteColor;
    color1?: PaletteColor;
    color2?: PaletteColor;
    color3?: PaletteColor;
    color4?: PaletteColor;
    color5?: PaletteColor;
  }
}

declare module '@mui/material' {
  interface ButtonPropsColorOverrides {
    color0;
    color1;
    color2;
    color3;
    color4;
    color5;
  }
}
