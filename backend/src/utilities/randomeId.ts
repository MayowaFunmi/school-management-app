const uniqueId = function () {
    const letters = 'ABCDEFGHJKLMNPQRTUVWXYZ';
    const numbers = '123456789';
    let result = '';

    // Generate 6 random numbers
    for (let i = 0; i < 6; i++) {
        const randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));
        result += randomNumber;
    }

    // Generate 2 random letters
    for (let i = 0; i < 2; i++) {
        const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        result += randomLetter;
    }


    return result;
}

export const generateUserUniqueId = () => {
    return `USER-${uniqueId()}`;
}

export const generateOrgUniqueId = () => {
    return `ORG-${uniqueId()}`;
}

export const schoolUniqueId = () => {
    return `SCH-${uniqueId()}`;
}