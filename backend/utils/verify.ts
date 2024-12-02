

export function verifyValuesAreString(values: string[]) {
    for(const value of values) {
        if(typeof value !== 'string') {
            return false;
        }
    }

    return true;
}