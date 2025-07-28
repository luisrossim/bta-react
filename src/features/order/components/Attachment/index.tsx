import { AttachmentList } from "./components/AttachmentList"
import { AttachmentForm } from "./components/AttachmentForm"

interface AttachmentProps {
   attachments: any[]
   onUpload: (file: FormData) => Promise<void>
   onRequestView: (attachmentId: string) => Promise<void>
   disableActions: boolean
}

export function Attachment({ 
   attachments,
   onUpload, 
   onRequestView, 
   disableActions 
}: AttachmentProps) {

   return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
         <AttachmentList 
            attachments={attachments} 
            onRequest={onRequestView} 
         />

         <AttachmentForm 
            onUpload={onUpload} 
            disableActions={disableActions} 
         />
      </div>
   )
}
