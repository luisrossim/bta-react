interface Attachment {
    id: string;
    ordemServicoId: string;
    url: string;
    tipo: string;
    descricao: string;
    criadoEm: Date;
}

interface AttachmentWithSignedUrl extends Attachment {
   url_temporaria: string
}

export {
   type Attachment,
   type AttachmentWithSignedUrl
}