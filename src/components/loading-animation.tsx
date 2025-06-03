import loadingAnimation from "@/assets/images/bouncing.svg" 

export const Loading = () => {
   return (
      <div 
         className="flex justify-center items-center w-full"
         style={{ height: 'calc(100vh - 200px)' }}
      >
         <img src={loadingAnimation} width={40} alt="loading-animation" />
      </div>
   )
}