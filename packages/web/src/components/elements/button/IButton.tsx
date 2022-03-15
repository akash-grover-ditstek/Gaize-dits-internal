// eslint-disable-next-line no-unused-vars
type CallbackFunctionVariadic = (...args: any) => void;

export interface IButtonContainer {
   background?: string;
   width?: string;
   float?: string;
   padding?: string;
   minWidth?: string;
   minHeight?: string;
   margin?: string;
   height?: string;
   xswidth?: string;
   type?: string;
   name?: string;
   value?: string;
   disabled?: boolean;
   onClick?: CallbackFunctionVariadic;
}

export interface IButton {
   background?: string;
   width?: string;
   padding?: string;
   minWidth?: string;
   minHeight?: string;
   float?: string;
   margin?: string;
   height?: string;
   xswidth?: string;
   text: string;
   type?: string;
   loading?: boolean;
   name?: string;
   value?: string;
   disabled?: boolean;
   onClick?: CallbackFunctionVariadic;
}
