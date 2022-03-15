import React from "react";
import styled from "styled-components";
import colors from "../../util/Colors";
import { Flex } from "./Flex";
import Cleave from "cleave.js/react";
import "cleave.js/dist/addons/cleave-phone.us";
// eslint-disable-next-line no-unused-vars
type CallbackFunctionVariadic = (...args: any) => void;

type CallbackFunction = () => void;

interface InputProps {
   width?: string;
   margin?: string;
   xswidth?: string;
   height?: string;
   maxWidth?: string;
   radius?: string;
   padding?: string;
   borderRadius?: string;
   top?: string;
   bottom?: string;
   left?: string;
   right?: string;
   header?: string;
   footer?: string;
   type?: string;
   placeholder?: string;
   onChange?: CallbackFunction | CallbackFunctionVariadic;
   checked?: string;
   required?: string;
   minLength?: string;
   maxLength?: string | number;
   readOnly?: string | boolean;
}

interface InputFieldProps {
   id?: string;
   name?: string;
   value: string;
   width?: string;
   margin?: string;
   xswidth?: string;
   height?: string;
   maxWidth?: string;
   radius?: string;
   padding?: string;
   borderRadius?: string;
   top?: string;
   bottom?: string;
   left?: string;
   right?: string;
   header?: string;
   footer?: string;
   type?: string;
   placeholder?: string;
   onChange?: CallbackFunction | CallbackFunctionVariadic;
   checked?: string;
   required?: string | boolean;
   minLength?: string;
   maxLength?: string | number;
   readOnly?: string;
   note?: string;
   suffix?: string;
}

interface AddressInputProps {
   header?: string;
   footer?: string;
   top?: string;
   type?: string;
   width?: string;
   address1Value?: string;
   cityValue?: string;
   stateValue?: string;
   zipValue?: string;
   borderRadius?: string;
   placeholder?: string;
   value?: string | CallbackFunction;
   maxLength?: string | number;
   cityOnChange?: CallbackFunction | CallbackFunctionVariadic;
   address1OnChange?: CallbackFunction | CallbackFunctionVariadic;
   address2Value?: CallbackFunction | CallbackFunctionVariadic;
   address2OnChange?: CallbackFunction | CallbackFunctionVariadic;
   zipOnChange?: CallbackFunction | CallbackFunctionVariadic;
   stateOnChange?: CallbackFunction | CallbackFunctionVariadic;
   onChange?: CallbackFunction | CallbackFunctionVariadic;
}

const InputContainer: React.FunctionComponent<InputProps> = styled.div<InputProps>`
   width: 100%;
   max-width: 100%;
   margin: 0px;

   @media screen and (max-width: 991px) {
      width: "100%";
   }
   @media screen and (max-width: 450px) {
      width: 100%;
   }
`;

const TextAreaStyle: React.FunctionComponent<InputFieldProps> = styled.textarea<InputFieldProps>`
   width: 100%;
   padding: 10px;
   border-radius: 5px;
   background: ${colors.white};
   border: 1px solid ${colors.grey5};
   height: 120px;
   font-family: "Poppins", sans-serif !important;
   box-sizing: border-box;
   max-width: 100%;
`;

const InputStyle: React.FunctionComponent<InputFieldProps> = styled.input<InputFieldProps>`
   height: 40px;
   width: 100%;
   padding: 0px 10px;
   border-radius: 5px;
   background: ${colors.white};
   border: 1px solid ${colors.grey5};
   box-sizing: border-box;
   outline: none;

   &:focus {
      border: 1px solid ${colors.blue};
   }
   @media screen and (max-width: 991px) {
      width: ${(props) => props.width || "100%"};
   }
`;

const AddressContainer = styled.div`
   width: ${(props: InputProps) => props.width};
   border-radius: 5px;
   background: ${colors.white};
   display: flex;
   flex-direction: column;
`;

const AddressInputStyle: React.FunctionComponent<AddressInputProps> = styled.input<AddressInputProps>`
   padding: 10px;
   width: 100%;
   min-width: 0;
   box-sizing: border-box;
   border-radius: ${(props) => props.borderRadius};
   background: ${colors.white};
   border: 1px solid ${colors.grey5};
   box-sizing: border-box;

   &:focus {
      border: 1px solid ${colors.grey3};
   }
`;

const PhoneInputStyle: React.FunctionComponent<InputFieldProps> = styled(
   Cleave
)<InputFieldProps>`
   width: ${(props) => props.width || "100%"};
   padding: 10px;
   border-radius: 5px;
   background: ${colors.white};
   border: 1px solid ${colors.grey5};
   box-sizing: border-box;
   height: ${(props) => props.height || "40px"};
   outline: none;

   &:focus {
      border: 1px solid ${colors.blue};
   }
   @media screen and (max-width: 991px) {
      width: ${(props) => props.width || "100%"};
   }

   @media screen and (max-width: 450px) {
      width: ${(props) => props.xswidth || null};
   }
`;

const HeaderStyle = styled.div`
   font-size: 0.9rem;
   color: ${colors.grey3};
   margin: ${(props: InputProps) =>
      props.top ? "0px 0px 10px 0px" : "20px 0px 8px 0px"};
`;

const FooterStyle = styled.div`
   font-size: 1.2rem;
   margin-top: 10px;
   color: ${colors.grey3};
`;

const Suffix = styled.div`
   color: ${colors.grey3};
   font-size: 1.4rem;
   font-weight: 600;
   margin-left: 10px;
`;

const DollarLabel = styled.div`
   background: ${colors.grey5};
   color: ${colors.grey3};
   display: flex;
   align-items: center;
   justify-content: center;
   font-weight: 500;
   font-size: 1.4rem;
   height: ${(props: InputProps) => props.height || "40px"};
   width: 25px;
   border-radius: 5px 0px 0px 5px;
`;

const PercentLabel = styled.div`
   background: ${colors.grey5};
   color: ${colors.grey3};
   display: flex;
   align-items: center;
   justify-content: center;
   font-weight: 500;
   font-size: 1.4rem;
   height: ${(props: InputProps) => props.height || "40px"};
   width: 25px;
   border-radius: 0 5px 5px 0;
`;

export default function Input({
   width,
   header,
   footer,
   type,
   placeholder,
   name,
   value,
   onChange,
   top,
   margin,
   checked,
   required,
   minLength,
   height,
   maxLength,
   readOnly,
   padding,
   xswidth,
}: InputFieldProps) {
   return (
      <InputContainer
         width={width || "400px"}
         margin={margin || ""}
         xswidth={xswidth}
      >
         {header && <HeaderStyle top={top}>{header}</HeaderStyle>}
         <InputStyle
            height={height || "40px"}
            width={width || "100%"}
            type={type || "text"}
            placeholder={placeholder || ""}
            value={value || ""}
            name={name || ""}
            onChange={onChange}
            checked={checked || ""}
            required={required}
            minLength={minLength}
            maxLength={maxLength}
            readOnly={readOnly}
            padding={padding || ""}
         />
         {footer && <FooterStyle>{footer}</FooterStyle>}
      </InputContainer>
   );
}

export function TextAreaInput({
   width,
   header,
   footer,
   type,
   placeholder,
   name,
   value,
   onChange,
   maxWidth,
   top,
   required,
   minLength,
   note,
}: InputFieldProps) {
   return (
      <InputContainer>
         {header && <HeaderStyle top={top}>{header}</HeaderStyle>}

         <TextAreaStyle
            width={width || "100%"}
            type={type || "text"}
            placeholder={placeholder || ""}
            name={name || ""}
            value={value || ""}
            onChange={onChange}
            required={required}
            minLength={minLength}
            maxWidth={maxWidth || ""}
         />
         {footer && <FooterStyle>{footer}</FooterStyle>}
         {note && <FooterStyle>{note}</FooterStyle>}
      </InputContainer>
   );
}

export function AddressInput({
   header,
   footer,
   top,
   width,
   address1Value,
   address1OnChange,
   address2Value,
   address2OnChange,
   cityValue,
   cityOnChange,
   stateValue,
   stateOnChange,
   zipValue,
   zipOnChange,
}: AddressInputProps) {
   return (
      <InputContainer width={width || "400px"}>
         {header && <HeaderStyle top={top}>{header}</HeaderStyle>}
         <AddressContainer width={width || "100%"}>
            <AddressInputStyle
               type="text"
               placeholder="Address 1"
               value={address1Value}
               onChange={address1OnChange}
            />
            <AddressInputStyle
               type="text"
               placeholder="Address 2"
               value={address2Value}
               onChange={address2OnChange}
            />
            <Flex>
               <AddressInputStyle
                  type="text"
                  placeholder="City"
                  value={cityValue}
                  onChange={cityOnChange}
               />
               <AddressInputStyle
                  type="text"
                  placeholder="State"
                  value={stateValue}
                  onChange={stateOnChange}
                  maxLength={2}
               />
               <AddressInputStyle
                  type="text"
                  placeholder="Zip"
                  value={zipValue}
                  onChange={zipOnChange}
               />
            </Flex>
         </AddressContainer>
         {footer && <FooterStyle>{footer}</FooterStyle>}
      </InputContainer>
   );
}

export function PhoneNumberInput({
   height,
   width,
   header,
   footer,
   xswidth,
   type,
   placeholder,
   value,
   onChange,
   top,
   readOnly,
   required,
}: InputFieldProps) {
   return (
      <InputContainer width={width || "100%"} xswidth={xswidth}>
         {header && <HeaderStyle top={top}>{header}</HeaderStyle>}
         <PhoneInputStyle
            height={height || "40px"}
            width="100%"
            type={type || "text"}
            placeholder={placeholder || ""}
            xswidth={xswidth || ""}
            value={value || ""}
            onChange={onChange}
            required={required}
            //options={{ phone: true, phoneRegionCode: 'US' }}
            readOnly={readOnly}
            maxLength={14} // need to fix that weird edge case with multiple 1's at beginning of phone number
            id="phoneInput"
         />
         {footer && <FooterStyle>{footer}</FooterStyle>}
      </InputContainer>
   );
}

export function MoneyInput({
   height,
   width,
   header,
   footer,
   type,
   placeholder,
   value,
   onChange,
   top,
   required,
   margin,
}: InputFieldProps) {
   return (
      <InputContainer width={width || "400px"} margin={margin}>
         {header && <HeaderStyle top={top}>{header}</HeaderStyle>}
         <Flex height={height} align="center">
            <DollarLabel height={height as string}>$</DollarLabel>
            <InputStyle
               height={height || "40px"}
               width={width || "100%"}
               type={type || "text"}
               placeholder={placeholder || ""}
               value={value || ""}
               onChange={onChange}
               required={required}
               radius="0px 5px 5px 0px"
            />
         </Flex>
         {footer && <FooterStyle>{footer}</FooterStyle>}
      </InputContainer>
   );
}

export function PercentInput({
   height,
   width,
   header,
   footer,
   type,
   placeholder,
   value,
   onChange,
   top,
   required,
   margin,
}: InputFieldProps) {
   return (
      <InputContainer width={width || "400px"} margin={margin}>
         {header && <HeaderStyle top={top}>{header}</HeaderStyle>}
         <Flex height={height} align="center">
            <InputStyle
               height={height || "40px"}
               width={width || "100%"}
               type={type || "text"}
               placeholder={placeholder || ""}
               value={value || ""}
               onChange={onChange}
               required={required}
               radius="5px 0px 0px 5px"
            />
            <PercentLabel height={height}>%</PercentLabel>
         </Flex>
         {footer && <FooterStyle>{footer}</FooterStyle>}
      </InputContainer>
   );
}

export function SuffixedInput({
   height,
   width,
   header,
   footer,
   type,
   placeholder,
   value,
   onChange,
   top,
   required,
   suffix,
}: InputFieldProps) {
   return (
      <InputContainer>
         {header && <HeaderStyle top={top}>{header}</HeaderStyle>}
         <Flex align="center">
            <InputStyle
               height={height || "40px"}
               width={width || "50px"}
               type={type || "text"}
               placeholder={placeholder || ""}
               value={value || ""}
               onChange={onChange}
               required={required}
            />
            <Suffix>{suffix}</Suffix>
         </Flex>
         {footer && <FooterStyle>{footer}</FooterStyle>}
      </InputContainer>
   );
}
