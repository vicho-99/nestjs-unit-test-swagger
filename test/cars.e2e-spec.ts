import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { DataSource } from 'typeorm';
import { setupDatabase } from './setup-database';
import * as request from 'supertest';

describe('CarsController (e2e)', () => {

    let app: INestApplication;
    let dataSource: DataSource;

    beforeAll(async () => {

        dataSource = await setupDatabase();

        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule],

        })
            .overrideProvider(DataSource)
            .useValue(dataSource)
            .compile();

        app = moduleFixture.createNestApplication();

        await app.init();

    });

    it('/cars (POST)', () => {
        return request(app.getHttpServer())
            .post('/cars')
            .send({
                brand: "Nissan",
                model: "Qashqai",
                year: 2023,
                color: "black",
                mileage: "0",
                price: "19990000",
                condition: "new"
            })
            .expect(201)
            .expect({
                id: 1,
                brand: "Nissan",
                model: "Qashqai",
                year: 2023,
                color: "black",
                mileage: "0",
                price: "19990000",
                condition: "new"
            });
    });

    it('/cars (GET)', () => {
        return request(app.getHttpServer())
            .get('/cars')
            .expect(200)
            .expect([
                {
                    id: 1,
                    brand: 'Nissan',
                    model: 'Qashqai',
                    year: 2023,
                    color: 'black',
                    mileage: 0,
                    price: 19990000,
                    condition: 'new'
                }
            ]);
    });

    it('/cars/1 (GET)', () => {
        return request(app.getHttpServer())
            .get('/cars/1')
            .expect(200)
            .expect(
                {
                    id: 1,
                    brand: 'Nissan',
                    model: 'Qashqai',
                    year: 2023,
                    color: 'black',
                    mileage: 0,
                    price: 19990000,
                    condition: 'new'
                }
            );
    });

    it('/cars/1 (PUT)', () => {
        return request(app.getHttpServer())
            .put('/cars/1')
            .send(
                {
                    brand: 'Nissan',
                    model: 'New Qashqai',
                    year: 2024,
                    color: 'black',
                    mileage: 0,
                    price: 19990000,
                    condition: 'new'
                }
            )
            .expect(200)
            .expect(
                {
                    brand: 'Nissan',
                    model: 'New Qashqai',
                    year: 2024,
                    color: 'black',
                    mileage: 0,
                    price: 19990000,
                    condition: 'new'
                }
            );
    });

    it('/cars/1 (DELETE)', () => {
        return request(app.getHttpServer())
            .delete('/cars/1')
            .expect(204)

    });

});
