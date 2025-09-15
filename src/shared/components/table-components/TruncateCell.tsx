import { useTruncateText } from '../../hooks/useTruncateText';

interface TruncateCellProps {
    text: string;
    maxLength?: number;
}

export function TruncateCell({ text, maxLength }: TruncateCellProps) {
    const truncated = useTruncateText(text, maxLength);
    return <span>{truncated}</span>;
}
