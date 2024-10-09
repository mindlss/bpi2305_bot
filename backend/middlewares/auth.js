const crypto = require('crypto');
const querystring = require('querystring');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

function validateTelegramHash(req, res, next) {
    // Extract the query string from the request
    const { hash } = req.body;
    //const queryString = req.url.split('?')[1];
    const parsedData = querystring.parse(hash);

    console.log(parsedData);
    
    // Extract and remove the hash from the parsed data
    const providedHash = parsedData.hash;
    delete parsedData.hash;

    // Recreate the data string used for hashing
    const dataCheckString = Object.keys(parsedData)
        .sort()
        .map((key) => `${key}=${parsedData[key]}`)
        .join('\n');

    // Generate the secret key using the bot token and the string 'WebAppData'
    const secretKey = crypto
        .createHmac('sha256', 'WebAppData')
        .update(process.env.BOT_TOKEN)
        .digest();

    // Generate the hash to validate against the provided hash
    const calculatedHash = crypto
        .createHmac('sha256', secretKey)
        .update(dataCheckString)
        .digest('hex');

    // Compare the calculated hash with the provided hash
    if (calculatedHash === providedHash) {
        // If the hash is valid, proceed to the next middleware or route handler
        next();
    } else {
        // If the hash is invalid, return a 403 Forbidden response
        res.status(403).json({ error: 'Invalid hash. Authentication failed.' });
    }
}

module.exports = validateTelegramHash;
