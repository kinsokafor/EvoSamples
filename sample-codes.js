export const toLocale = (number) => {
    number = parseFloat(number)
    number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}