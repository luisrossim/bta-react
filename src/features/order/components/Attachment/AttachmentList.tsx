import type { Attachment } from '@/features/order/types/Attachment';
import { formatTimestamp } from '@/shared/utils/formatDate';
import { File, FileAudio, FileImage, FileVideo } from 'lucide-react';

interface AttachmentListProps {
    attachments: Attachment[];
    onRequest: (attachmentId: string) => Promise<void>;
}

function getFileIcon(type: string) {
    switch (true) {
        case type.includes('image'):
            return <FileImage className='text-primary' />;
        case type.includes('video'):
            return <FileVideo className='text-primary' />;
        case type.includes('audio'):
            return <FileAudio className='text-primary' />;
        default:
            return <File className='text-primary' />;
    }
}

export function AttachmentList({
    attachments,
    onRequest,
}: AttachmentListProps) {
    return (
        <div className='grid grid-cols-1 gap-4 mb-4'>
            {attachments.map((attachment) => (
                <button
                    key={attachment.id}
                    onClick={() => onRequest(attachment.id)}
                    className='flex items-center gap-2 hover:bg-accent transition-colors p-1 rounded-sm'
                >
                    <div className='flex items-center justify-center'>
                        {getFileIcon(attachment.tipo)}
                    </div>

                    <div className='flex flex-col items-start gap-1 text-xs text-start'>
                        <p className='font-medium text-wrap'>
                            {attachment.descricao}
                        </p>
                        <p className='text-muted-foreground'>
                            {formatTimestamp(attachment.criadoEm)}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    );
}
