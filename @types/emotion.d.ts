import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      text: string;
      background: string;
      tint: string;
      tabIconDefault: string;
      tabIconSelected: string;
      shadowColor: string;
      oppositeShadowColor: string;
    };
    size: {
      fontSize: number;
      pageHorizontalPadding: number;
    };
  }
}
