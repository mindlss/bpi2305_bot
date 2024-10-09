exports.getTicketLabel = (count) => {
    const lastDigit = count % 10;
    const lastTwoDigits = count % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${count} билетов! 🥳`;
    }

    if (count == 0) {
        return `${count} билетов(`;
    }

    switch (lastDigit) {
        case 1:
            return `${count} билет! 🥳`;
        case 2:
        case 3:
        case 4:
            return `${count} билета! 🥳`;
        default:
            return `${count} билетов! 🥳`;
    }
}

