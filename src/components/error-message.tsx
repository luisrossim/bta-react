interface ErrorMessageProps {
   message: string
}

export const ErrorMessage = (props: ErrorMessageProps) => {
   return (
      <div className="bg-red-200 p-4 rounded-md">
         <p className="text-red-600 text-sm">{ props.message }</p>
      </div>
   )
}