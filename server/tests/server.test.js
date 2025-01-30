import request from 'supertest';
import app from '../server.js';
import { jest } from '@jest/globals';
import { pool } from '../config/database.js';

describe('Endpoints GET tests', () => {
    // api
    it('GET /api powinno zwrócić odpowiedni kod odpowiedzi', async () => {
        const response = await request(app).get('/api');
        expect(response.statusCode).toBe(200);
    });

    it('GET /api powinno zwrócić błąd serwera przy nieudanym zapytaniu', async () => {
        jest.spyOn(pool, 'query').mockImplementationOnce((_, callback) => {
            callback(new Error("Błąd zapytania"), null);
        });
        const response = await request(app).get('/api');
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Błąd serwera');
    });

    //likes
    it('GET /likes powinno zwrócić odpowiedni kod odpowiedzi', async () => {
        const response = await request(app).get('/likes');
        expect(response.statusCode).toBe(200);
    });

    it('GET /likes powinno zwrócić błąd serwera przy nieudanym zapytaniu', async () => {
        jest.spyOn(pool, 'query').mockImplementationOnce((_, callback) => {
            callback(new Error("Błąd zapytania"), null);
        });
        const response = await request(app).get('/likes');
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Błąd serwera');
    });

    //save
    it('GET /save powinno zwrócić odpowiedni kod odpowiedzi', async () => {
        const response = await request(app).get('/save');
        expect(response.statusCode).toBe(200);
    });

    it('GET /save powinno zwrócić błąd serwera przy nieudanym zapytaniu', async () => {
        jest.spyOn(pool, 'query').mockImplementationOnce((_, callback) => {
            callback(new Error("Błąd zapytania"), null);
        });
        const response = await request(app).get('/save');
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Błąd serwera');
    });

    //icons
    it('GET /icons powinno zwrócić odpowiedni kod odpowiedzi', async () => {
        const response = await request(app).get('/icons');
        expect(response.statusCode).toBe(200);
    });

    it('GET /icons powinno zwrócić błąd serwera przy nieudanym zapytaniu', async () => {
        jest.spyOn(pool, 'query').mockImplementationOnce((_, callback) => {
            callback(new Error("Błąd zapytania"), null);
        });
        const response = await request(app).get('/icons');
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Błąd serwera');
    });

    //eventsToAccept
    it('GET /eventsToAccept powinno zwrócić odpowiedni kod odpowiedzi', async () => {
        const response = await request(app).get('/eventsToAccept');
        expect(response.statusCode).toBe(200);
    });

    it('GET /eventsToAccept powinno zwrócić błąd serwera przy nieudanym zapytaniu', async () => {
        jest.spyOn(pool, 'query').mockImplementationOnce((_, callback) => {
            callback(new Error("Błąd zapytania"), null);
        });
        const response = await request(app).get('/eventsToAccept');
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Błąd serwera');
    });

    //eventsReported
    it('GET /eventsReported powinno zwrócić odpowiedni kod odpowiedzi', async () => {
        const response = await request(app).get('/eventsReported');
        expect(response.statusCode).toBe(200);
    });

    it('GET /eventsReported powinno zwrócić błąd serwera przy nieudanym zapytaniu', async () => {
        jest.spyOn(pool, 'query').mockImplementationOnce((_, callback) => {
            callback(new Error("Błąd zapytania"), null);
        });
        const response = await request(app).get('/eventsReported');
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Błąd serwera');
    });

    //rankingList
    it('GET /rankingList powinno zwrócić odpowiedni kod odpowiedzi', async () => {
        const response = await request(app).get('/rankingList');
        expect(response.statusCode).toBe(200);
    });

    it('GET /rankingList powinno zwrócić błąd serwera przy nieudanym zapytaniu', async () => {
        jest.spyOn(pool, 'query').mockImplementationOnce((_, callback) => {
            callback(new Error("Błąd zapytania"), null);
        });
        const response = await request(app).get('/rankingList');
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Błąd serwera');
    });

    //usersapi
    it('GET /usersapi powinno zwrócić odpowiedni kod odpowiedzi', async () => {
        const response = await request(app).get('/usersapi');
        expect(response.statusCode).toBe(200);
    });

    it('GET /usersapi powinno zwrócić błąd serwera przy nieudanym zapytaniu', async () => {
        jest.spyOn(pool, 'query').mockImplementationOnce((_, callback) => {
            callback(new Error("Błąd zapytania"), null);
        });
        const response = await request(app).get('/usersapi');
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Błąd serwera');
    });
});

describe('Endpoints POST tests', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    const mockQuery = (implementation) => {
        jest.spyOn(pool, 'query').mockImplementation(implementation);
    };

    // POST /reg
    it('POST /reg powinno zwrócić 400 przy braku danych w zapytaniu', async () => {
        const response = await request(app).post('/reg').send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Brak tokenu CAPTCHA');
    });

    it('POST /reg powinno zwrócić 400 jeśli email już istnieje', async () => {
        mockQuery((query, values, callback) => {
            callback(null, [{ email: 'test@example.com' }]);
        });
        const response = await request(app).post('/reg').send({ name: 'Test', email: 'grzybb04@gmail.com', pass: '12345', captchaToken: 'valid-token' });
        expect(response.statusCode).toBe(500);
        expect(response.body.message).toBe('Już jest taki email');
    });

    it('POST /reg powinno zwrócić 200 przy poprawnej rejestracji', async () => {
        mockQuery((query, values, callback) => {
            callback(null, []);
        });
        const response = await request(app).post('/reg').send({ name: 'Test', email: 'new@example.com', pass: '12345', captchaToken: 'valid-token' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Zarejestrowano pomyślnie');
    });

    // POST /addlike
    it('POST /addlike powinno zwrócić 400 przy braku wymaganych danych', async () => {
        const response = await request(app).post('/addlike').send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Brak wymaganego parametru: userId lub eventId');
    });

    it('POST /addlike powinno zwrócić 200 przy poprawnym dodaniu polubienia', async () => {
        mockQuery((query, values, callback) => {
            callback(null, []);
        });
        const response = await request(app).post('/addlike').send({ userId: 1, eventId: 2 });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('dodano polubienie');
    });

    // POST /addevent
    it('POST /addevent powinno zwrócić 400 przy braku wymaganych danych', async () => {
        const response = await request(app).post('/addevent').send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Brak wymaganych danych.');
    });

    it('POST /addevent powinno zwrócić 200 przy poprawnym dodaniu wydarzenia', async () => {


        const response = await request(app).post('/addevent').send({
            id: 1,
            email: 'test@example.com',
            title: 'Wydarzenie Testowe',
            desc: 'Opis wydarzenia',
            country: 'Polska',
            city: 'Warszawa',
            street: 'Marszałkowska',
            number: '1',
            type: 'kultura',
            date: '2025-01-01',
            hour: '18:00'
        })

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Dodanie zgłoszenia zakończone sukcesem');
    });

    // POST /addreport
    it('POST /addreport powinno zwrócić 400 przy braku wymaganych danych', async () => {
        const response = await request(app).post('/addreport').send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Brak wymaganego parametru: id lub eventId');
    });

    it('POST /addreport powinno zwrócić 200 przy poprawnym dodaniu zgłoszenia', async () => {
        mockQuery((query, values, callback) => {
            callback(null, []);
        });
        const response = await request(app).post('/addreport').send({ id: 1, eventId: 2 });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Dodanie zgłoszenia zakończone sukcesem');
    });

    // POST /sendalert
    it('POST /sendalert powinno zwrócić 400 przy braku danych', async () => {
        const response = await request(app).post('/sendalert').send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Brak wymaganego parametru: value');
    });

    it('POST /sendalert powinno zwrócić 200 przy poprawnym wysłaniu alertu', async () => {
        mockQuery((query, values, callback) => {
            callback(null, []);
        });
        const response = await request(app).post('/sendalert').send({ id: 1, value: 'Testowy alert' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Wysłano wiadomość do użytkownika');
    });

    // POST /edituserdata
    it('POST /edituserdata powinno zwrócić 400 przy braku danych', async () => {
        const response = await request(app).post('/edituserdata').send({});
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe('Brak wymaganego parametru: type lub value');
    });

    it('POST /edituserdata powinno zwrócić 200 przy poprawnej edycji danych użytkownika', async () => {
        mockQuery((query, values, callback) => {
            callback(null, []);
        });
        const response = await request(app).post('/edituserdata').send({ id: 1, type: 'name', value: 'Nowe Imię' });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('zmieniono dane użytkownika');
    });
});

