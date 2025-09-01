export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
    return Object.entries(obj)
        .filter(
            ([_, value]) =>
                value !== null && value !== undefined && value !== ''
        )
        .reduce((acc, [key, value]) => {
            acc[key as keyof T] = value;
            return acc;
        }, {} as Partial<T>);
}
