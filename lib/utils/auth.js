const CognitoExpress = require('cognito-express')

const securedMethod = ['POST', 'PATCH', 'DELETE'];

const cognitoExpress = new CognitoExpress({
    region: process.env.AWS_COGNITO_REGION,
    cognitoUserPoolId: process.env.AWS_USER_POOLS_ID,
    tokenUse: 'id', //Possible Values: access | id
    tokenExpiration: 36000, //Up to default expiration of 1 hour (3600000 ms)
})

const cognitoAuth = async (req) => {
    try {
        const auth = req.headers.authorization || req.headers.Authorization;
        if (!auth) throw 'No authorization provided'
        await cognitoExpress.validate(auth)
        return true;
    } catch (error) {
        error.message = 'not authorized'
        throw error;
    }
}

module.exports = { cognitoAuth, securedMethod }