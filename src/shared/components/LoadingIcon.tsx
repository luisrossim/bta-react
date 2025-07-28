import loadingAnimation from "@/assets/images/tube-spinner.svg";

interface LoadingIconProps {
  size?: number;
  alt?: string;
}

export function LoadingIcon({ 
   size = 42, 
   alt = "Carregando..."
}: LoadingIconProps) {
  return (
    <div className="flex justify-center items-center">
      <img
        src={loadingAnimation}
        alt={alt}
        width={size}
        height={size}
        aria-busy="true"
      />
    </div>
  );
}
