const crypto = require('crypto');
const dotenv = require('dotenv');

dotenv.config();

exports.validateHash = (queryString) => {
    const parsedData = querystring.parse(queryString);

    const providedHash = parsedData.hash;
    delete parsedData.hash;

    const dataCheckString = Object.keys(parsedData)
        .sort()
        .map((key) => `${key}=${parsedData[key]}`)
        .join('\n');

    const secretKey = crypto
        .createHmac('sha256', 'WebAppData')
        .update(process.env.BOT_TOKEN)
        .digest();

    const calculatedHash = crypto
        .createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

    if (calculatedHash === providedHash) {
        return true;
    } else {
        return false;
    }
};
