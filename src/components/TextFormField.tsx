import { Control, FieldValues, Path } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "../components/ui/form";
import { Input } from "../components/ui/input";

interface TextFormFieldProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}

export const TextFormField = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: TextFormFieldProps<TFieldValues>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel className="flex gap-2 text-[15px]">
            {label}
            {required && <span className="text-red-500 font-bold">*</span>}
          </FormLabel>
          <FormControl className="focus:ring-primary no-focus">
            <Input
              placeholder={placeholder}
              type={type}
              {...field}
              className="!py-6"
            />
          </FormControl>
          <FormMessage className="text-red-500 absolute -bottom-0.5 translate-y-full text-xs" />
        </FormItem>
      )}
    />
  );
};