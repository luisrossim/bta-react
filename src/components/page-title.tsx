interface PageTitleProps {
    title: string
}

export const PageTitle = ({ title }: PageTitleProps) => {
    return (
        <h1 className="text-xl md:text-2xl font-medium">
            {title}
        </h1>
    )
}