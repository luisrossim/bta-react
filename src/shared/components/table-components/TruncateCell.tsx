import { useTruncateText } from '../../hooks/useTruncateText';

export function TruncateCell({ text }: { text: string }) {
    const truncated = useTruncateText(text);
    return <span>{truncated}</span>;
}
