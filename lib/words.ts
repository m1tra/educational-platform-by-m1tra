export function pairOfWords(str: string) {
    let modified = false; 
    let result = '';

    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i].toUpperCase() && str[i] !== str[i].toLowerCase()) {
            result += '___'; 
            modified = true; 
        } else {
            result += str[i]; 
        }
    }

    return modified ? result : null; 
}
