/* eslint-disable react/jsx-props-no-spreading */
import { ThemeFonts } from '../../types/style';
import StyledInput from './text-box.styles';

export type ChangeHandler = (event: {
  target: any;
  type?: any;
}) => Promise<void | boolean>;

export type UseFormRegisterReturn = {
  onChange: ChangeHandler;
  onBlur: ChangeHandler;
  ref: (instance: any) => void;
  name: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
};

export type TextBoxProps = {
  /**
   * The type of text box
   * @default "text"
   */
  type?: 'text' | 'password' | 'email';
  /**
   * The size of the text box
   * @default "normal"
   */
  size?: keyof ThemeFonts;
  /**
   * Text that appears in the form control when it has no value set
   * @default ""
   */
  placeholder?: string;
  /**
   * Register your component by relay register method to this property;
   * @default undefined
   */
  register?: UseFormRegisterReturn;
  /**
   * Enable autocompletion
   * @default false
   */
  autocomplete?: boolean;
  /**
   * The style of the textbox's border
   * @default 'full'
   */
  border?: 'full' | 'single-line' | 'none';
  /**
   * The value of the textbox
   * @default false
   */
  value?: string | undefined;
  /**
   * Optional edit handler (if the register property is defined, the oneEdit handler will be ignored)
   * @default false
   */
  onEdit?: (value: string) => void;
};

/**
 * Just a simple text box component.
 * If you need advanced animated placeholder, the wrap this component inside of the Label component.
 */
export const TextBox = ({
  type = 'text',
  size = 'normal',
  placeholder = '',
  register,
  autocomplete = false,
  border = 'full',
  value,
  onEdit,
}: TextBoxProps) => (
  <StyledInput
    type={type}
    size={size}
    border={border}
    placeholder={placeholder}
    autoComplete={autocomplete ? 'on' : 'off'}
    defaultValue={value}
    {...(register ?? {
      onChange: onEdit
        ? (e: React.ChangeEvent<HTMLInputElement>) => onEdit(e.target.value)
        : undefined,
    })}
  />
);
