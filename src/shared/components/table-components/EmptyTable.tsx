export function EmptyTable() {
    return (
        <div className='flex flex-col text-muted-foreground items-center text-sm gap-2'>
            <img
                src='/empty-folder.png'
                alt='empty'
                draggable={false}
                width={64}
            />
            <p>Nenhum registro encontrado</p>
        </div>
    );
}
