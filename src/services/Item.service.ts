import DB from '../config/db';

export const addItem = async (itemData: any) => {
    try {
        console.log(itemData);
        const db = DB.client.db('ourmoney');
        const test = db.collection('test');
        const result = await test.insertOne(itemData);
        return itemData;
    } catch (e) {
        throw new Error(e);
    }
};

export const getItem = async (id: number) => {
    try {
        const db = DB.client.db('ourmoney');
        const test = db.collection('test');

        const result = await test.findOne({ item: id });
        return result;
    } catch (e) {
        throw new Error(e);
    }
};
