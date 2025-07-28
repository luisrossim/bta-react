export interface Attachment {
  id: string;
  ordemServicoId: string;
  url: string;
  tipo: string;
  descricao: string;
  criadoEm: Date;
}

export interface AttachmentWithSignedUrl extends Attachment {
  url_temporaria: string
}