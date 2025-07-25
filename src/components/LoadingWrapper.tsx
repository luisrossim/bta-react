import spinnerAnimation from "@/assets/images/spinner-blue.svg" 

export const LoadingWrapper = () => {
   return (
      <div className="flex justify-center items-center w-full">
         <img src={spinnerAnimation} width={40} alt="loading-animation" />
      </div>
   )
}
