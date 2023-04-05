export type TextInputProps = {
  value?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
}

export const TextInput = ({
  onChange,
  placeholder,
  value,
  className,
  }: TextInputProps): JSX.Element  => {

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  }

  return (
      <input
        className={`border p-2 text-gray-600 hover:text-gray-900 ${className}`}
        placeholder={ placeholder }
        value={ value }
        {...(onChange && { onChange: onChangeHandler })}
      />
  )
}
