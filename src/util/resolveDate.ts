export const resolveDate = (date: string, format?: string) => {
    date = date.replace(/-|\./g, '/');

    if (format == 'dd-mm-yyyy') {
        const spl = date.split('/');
        date = `${spl[1]}/${spl[0]}/${spl[2]}`;
    }

    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        day: 'numeric',
        month: 'short',
    });
};
