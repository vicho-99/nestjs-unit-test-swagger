import { newDb } from 'pg-mem';

export const setupDatabase = async () => {
    const db = newDb();

    db.public.registerFunction({
        implementation: () => 'test',
        name: 'current_database',
    });

    db.public.registerFunction({
        name: 'version',
        implementation: () => 'Im not sure about PostgreSQL version',
    });

    const dataSource = await db.adapters.createTypeormDataSource({
        type: 'postgres',
        entities: [__dirname + '../../src/**/*.entity{.ts,.js}'],
        migrationsRun: false,
        migrationsTransactionMode: 'each',
        synchronize: false,
    });

    await dataSource.initialize();
    await dataSource.synchronize();

    return dataSource;
    
};