import * as models from './models';

import { connectToDatabase } from './connect';

const createDb = async () => {
    await connectToDatabase();
    const result = Promise.all(
        Object.keys(models).map(async (key) => {
            await models[key].createCollection();
        })
    );
    await result;
}

export default createDb;