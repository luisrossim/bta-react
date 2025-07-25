import welcome from "@/assets/images/welcome.avif";

export function WelcomeImage() {
   return (
      <div
         className="bg-muted relative hidden lg:block bg-cover bg-center hue-rotate-15"
         style={{ 
            backgroundImage: `url(${welcome})`, 
            backgroundPosition: "bottom" 
         }}
      ></div>
   )
}