interface LabelValueProps {
   label: string
   value: any
}

export function ListItem({ label, value }: LabelValueProps) {
   return (
      <div className="flex flex-col gap-1">
         <h2 className="font-medium text-neutral-500 text-sm">
            {label}
         </h2>
         <p className="font-medium">{value || "-"}</p>
      </div>
   )
}