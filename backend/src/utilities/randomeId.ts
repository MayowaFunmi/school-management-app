export const generateUniqueId = function () {
    const letters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ'; // Omitted 'O'
    const numbers = '123456789'; // Omitted '0'

    let result = '';

    // Generate 5 random letters
    for (let i = 0; i < 5; i++) {
        const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
        result += randomLetter;
    }

    // Generate 3 random numbers
    for (let i = 0; i < 3; i++) {
        const randomNumber = numbers.charAt(Math.floor(Math.random() * numbers.length));
        result += randomNumber;
    }

    return result;
}