import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import * as React from 'react';

interface AccordionListProps {
    title: string;
    children: React.ReactNode;
    collapsible?: boolean;
    className?: string;
}

export const AccordionList: React.FC<AccordionListProps> = ({
    title,
    children,
    className,
    collapsible = true,
}) => (
    <Accordion
        type='single'
        collapsible={collapsible}
        defaultValue='item-1'
        className={`border rounded-lg ${className}`}
    >
        <AccordionItem value='item-1' className='border-0'>
            <AccordionTrigger className='font-semibold px-4 py-3 rounded-t-lg'>
                {title}
            </AccordionTrigger>
            <AccordionContent className='px-4 rounded-b-lg'>
                {children}
            </AccordionContent>
        </AccordionItem>
    </Accordion>
);
