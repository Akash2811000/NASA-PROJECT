const request = require('supertest');
const app = require('../../app');
const { mongooseConnect } = require('../../services/mongose');

describe('Launcg api' , () => {
      beforeAll(async() => {
        await mongooseConnect();
      })

    describe('Test Get launch', ()=> {
            test('response 200' , async ()=> {
                const response = await request(app)
                .get('/v1//launch')
                .expect('Content-type', /json/)
                .expect(200)
            })
    });
    
    describe('Test Post launch', ()=> {
        const compeleteLaunchDate = {
            mission: "Kepler Exploration X",
            rocket: "Explorer IS1",
            launchDate: "November 29,2024",
            destination: "Kepler-442 b"
        }
        const inCompeleteLaunchDate = {
            mission: "Kepler Exploration X",
            rocket: "Explorer IS1",
            destination: "Kepler-442 b"
        }
    
        const launchInvalidDate    = {
            mission: "Kepler Exploration X",
            rocket: "Explorer IS1",
            destination: "Kepler-442 b",
            launchDate: "sky",
        }
    
        
    
        test('response 201 post sucess' , async()=> {
            const response = await request(app)
            .post('/v1/launch')
            .send(compeleteLaunchDate)
            .expect('Content-type', /json/)
            .expect(201)
            const requestDate = new Date(compeleteLaunchDate.launchDate).valueOf();
            const responseDate =new Date(response.body.launchDate).valueOf();
            expect(requestDate).toBe(responseDate);
            expect(response.body).toMatchObject(inCompeleteLaunchDate)
            
        })
        test('Missing required parameter' , async ()=> {
            const response = await request(app)
            .post('/v1/launch')
            .send(inCompeleteLaunchDate)
            .expect('Content-type', /json/)
            .expect(400)
    
            expect(response.body).toStrictEqual({
                error : "missing require property"
            })
        })
        test('invalid date' ,  async ()=> {
            const response = await request(app)
            .post('/v1/launch')
            .send(launchInvalidDate)
            .expect('Content-type', /json/)
            .expect(400)
    
            expect(response.body).toStrictEqual({
                error : "invalid date"
            })
        })
    });
})
