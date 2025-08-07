import type { Attachment } from "@/features/order/types/Attachment"
import { formatTimestamp } from "@/shared/utils/formatDate"
import { File, FileImage, FileVideo, FileAudio } from "lucide-react"

interface AttachmentListProps {
   attachments: Attachment[]
   onRequest: (attachmentId: string) => Promise<void>
}

function getFileIcon(type: string) {
   switch (type) {
      case "image":
         return <FileImage className="text-primary" />
      case "video":
         return <FileVideo className="text-primary" />
      case "audio":
         return <FileAudio className="text-primary" />
      default:
         return <File className="text-primary" />
   }
}

export function AttachmentList({ attachments, onRequest }: AttachmentListProps) {
  return (
      <>
         {attachments.map((attachment) => (
            <button
               key={attachment.id}
               onClick={() => onRequest(attachment.id)}
               className="group flex gap-1 flex-col cursor-pointer items-center justify-center p-4 rounded-lg border hover:bg-accent transition-colors"
            >
               <div className="flex items-center justify-center">
                  {getFileIcon(attachment.tipo)}
               </div>
               <span className="text-xs text-center font-medium truncate w-full mt-2">
                  {attachment.descricao}
               </span>
               <span className="text-xs text-center text-muted-foreground truncate w-full">
                  {formatTimestamp(attachment.criadoEm)}
               </span>
            </button>
         ))}
    </>
  )
}
