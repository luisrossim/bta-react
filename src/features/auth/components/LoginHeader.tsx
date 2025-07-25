export function LoginHeader() {
   return (
      <div className="flex justify-start gap-2">
         <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex w-[36px] h-[36px] p-1 items-center justify-center rounded-md">
               <img
                  src="favicon.svg"
                  className="brightness-0 invert saturate-0"
                  alt="bta-logo"
               />
            </div>

            <div className="flex flex-col">
               <span className="text-sm font-semibold">BTA Irrigação</span>
               <span className="text-xs text-muted-foreground">Ordens de serviço</span>
            </div>
         </a>
      </div>
   )
}