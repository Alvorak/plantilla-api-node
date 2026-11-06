import { Db, MongoClient } from 'mongodb';
import 'dotenv/config';

const getRequiredEnvironmentVariable = (name: string): string => {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Falta la variable de entorno ${name}`);
    }

    return value;
};

const user = encodeURIComponent(getRequiredEnvironmentVariable('MONGODB_USER'));
const password = encodeURIComponent(getRequiredEnvironmentVariable('MONGODB_PASSWORD'));
const cluster = getRequiredEnvironmentVariable('MONGODB_CLUSTER');
const database = getRequiredEnvironmentVariable('MONGODB_DATABASE');
const client = new MongoClient(`mongodb+srv://${user}:${password}@${cluster}/`);

export const connectMongo = (): Promise<Db> => {
    return client.connect().then(() => {
        console.log("Dentro del Monguito");

        return client.db(database);
    }).catch((error) => {
        console.log("Error al conectar con Mongo");
        throw error;
    });
};
