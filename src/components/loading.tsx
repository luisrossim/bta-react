import loadingBlueIcon from "@/assets/images/spinner-blue.svg" 
import loadingCyanIcon from "@/assets/images/spinner-cyan.svg" 

export const LoadingWrapper = () => {
   return (
      <div 
         className="flex justify-center items-center w-full"
         style={{ height: 'calc(100vh - 160px)' }}
      >
         <LoadingIcon />
      </div>
   )
}

export const LoadingIcon = ({ variant = 'blue' }: { variant?: 'blue' | 'cyan' }) => {
   const loadingIconSrc = variant == 'cyan' ? loadingCyanIcon : loadingBlueIcon 

   return (
      <img src={loadingIconSrc} width={40} className="p-1" alt="loading-animation" />
   )
}