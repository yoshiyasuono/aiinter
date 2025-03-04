import * as React from "react";
import { Input } from "./input";

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (value: string) => void;
}

export function DateInput({ onChange, ...props }: DateInputProps) {
  return (
    <Input
      type="date"
      placeholder="YYYY-MM-DD"
      {...props}
      style={{
        ...props.style,
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
      onChange={(e) => {
        if (onChange) {
          onChange(e.target.value);
        }
      }}
    />
  );
}
