import { useIsMobile } from './useIsMobile';

export function useTruncateText(text: string, maxLength: number = 24) {
    const isMobile = useIsMobile();

    return text.length > maxLength && isMobile
        ? text.slice(0, maxLength)
        : text;
}
