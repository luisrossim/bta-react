export const PageTitle = ({ title }: { title: string }) => {
    return (
        <h1 className="text-2xl md:text-3xl font-medium mb-2">
            {title}
        </h1>
    )
}

export const PageSubtitle = ({ subtitle }: { subtitle: string }) => {
    return (
        <h2 className="text-sm text-slate-500">
            {subtitle}
        </h2>
    )
}