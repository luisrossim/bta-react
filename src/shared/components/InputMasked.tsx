import { Input } from "@/components/ui/input";
import { PatternFormat, type PatternFormatProps } from "react-number-format";

export const InputMasked = (props: PatternFormatProps) => {
  return (
    <PatternFormat
      {...props}
      customInput={Input}
    />
  );
};
