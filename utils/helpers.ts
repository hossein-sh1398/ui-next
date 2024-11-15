
export function handleErrors(errors:any) {
    if (typeof errors === 'object') {
        const messages:string[] = [];
        
        Object.keys(errors).map(key => messages.push(errors[key][0]))

        return messages.join(', ');
    }

    return errors;
}