interface HelperTextProps {
   message: string,
   variant?: 'default' | 'invalid'
}

export const HelperText = ({ message, variant = 'default' }: HelperTextProps) => {
   const textColor = variant == "invalid" ? "text-red-500" : "text-neutral-500"

   return (
      <p className={`text-xs ${textColor}`}>
         { message }
      </p>
   )
}
