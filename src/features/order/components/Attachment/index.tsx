import { AttachmentForm } from './components/AttachmentForm';
import { AttachmentList } from './components/AttachmentList';

interface AttachmentProps {
    attachments: any[];
    onUpload: (file: FormData) => Promise<void>;
    onRequestView: (attachmentId: string) => Promise<void>;
    disableActions: boolean;
}

export function Attachment({
    attachments,
    onUpload,
    onRequestView,
    disableActions,
}: AttachmentProps) {
    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 gap-4 mt-1'>
            <AttachmentList
                attachments={attachments}
                onRequest={onRequestView}
            />

            <AttachmentForm
                onUpload={onUpload}
                disableActions={disableActions}
            />
        </div>
    );
}
