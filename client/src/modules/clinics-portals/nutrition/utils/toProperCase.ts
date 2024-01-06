export const toTitleCase = (str: string) => {
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}


