import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import entryData from '../models/entries';

const { expect } = chai;
const request = supertest(app);

describe('All test cases for MyDiary application', () => {
  describe('test case for loading application home page', () => {
    it('Should load application home page', (done) => {
      request.get('/')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).deep.equal({
            message: 'Welcome to My Diary application'
          });
          if (err) done(err);
          done();
        });
    });
  });
  describe('All test cases for application invalid routes', () => {
    it('should fail to load application home page', (done) => {
      request.get('/home')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).deep.equal({
            status: 'Failed',
            message: 'Page not found'
          });
          if (err) done(err);
          done();
        });
    });
    it('Should fail to load application home page', (done) => {
      request.get('/mydiary')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).deep.equal({
            status: 'Failed',
            message: 'Page not found'
          });
          if (err) done(err);
          done();
        });
    });
    it('Should fail to get route', (done) => {
      request.get('/api/v1')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).deep.equal({
            status: 'Failed',
            message: 'Page not found'
          });
          if (err) done(err);
          done();
        });
    });
  });

  describe('All test cases for Users', () => {
    describe('All test cases for user signUp ', () => {
      const userInfo = {
        fullname: 'Hammed Noibi',
        username: 'hnobi',
        email: 'hnobi09@yahoo.com',
        password: '12345678'
      };
      it('should create a new user account and return a `201`', (done) => {
        request.post('/api/v1/auth/signup')
          .send(userInfo)
          .expect(201)
          .end((err, res) => {
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Successfully created myDiary account');
            expect(res.body.data.username).to.equal('hnobi');
            expect(res.body.data.email).to.equal('hnobi09@yahoo.com');
            if (err) done(err);
            done();
          });
      });
      it('should  check if user already in the database and return a `409`', (done) => {
        request.post('/api/v1/auth/signup')
          .send(userInfo)
          .expect(201)
          .end((err, res) => {
            expect(res.body.status).to.equal('Failed');
            expect(res.body.message).to.equal('User already exist');
            done();
          });
      });
      it('should  not create a new user account and return a `400`', (done) => {
        request.post('/api/v1/auth/signup')
          .send({})
          .expect(400)
          .end((err, res) => {
            expect(res.body).deep.equal({
              message: 'All or some of the field is/are undefined'
            });
            done();
          });
      });
      it('should  not create a new user account and return a `400`', (done) => {
        request.post('/api/v1/auth/signup')
          .send({
            fullname: '',
            username: '',
            email: '',
            password: ''
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.fullname).to.equal('fullname  is required');
            expect(res.body.errors.username).to.equal('username  is required');
            expect(res.body.errors.email).to.equal('email is required');
            expect(res.body.errors.password).to.equal('password  is required');
            done();
          });
      });
      it('should  not create a new user account and return a `400`', (done) => {
        request.post('/api/v1/auth/signup')
          .send({
            fullname: '300hamed',
            username: 'h',
            email: 'hboy.com',
            password: 'dddd'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.fullname).to.equal('fullname  must not contain numbers');
            expect(res.body.errors.username).to.equal('username must be between 2 to 100 characters');
            expect(res.body.errors.email).to.equal('Enter a valid email address');
            expect(res.body.errors.password).to.equal('password must be eight character or more');
            done();
          });
      });
    });
    describe('All test cases for user signIn ', () => {
      const userInfo = {
        username: 'hnobi',
        password: '12345678'
      };
      it('should Login  a new user and return a `201`', (done) => {
        request.post('/api/v1/auth/signin')
          .send(userInfo)
          .expect(201)
          .end((err, res) => {
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('successfull login');
            expect(res.body.data.username).to.equal('hnobi');
            expect(res.body.data.email).to.equal('hnobi09@yahoo.com');
            done();
          });
      });
      it('should not Login  a new user and return a `500`', (done) => {
        request.post('/api/v1/auth/signin')
          .send({
            username: 'wronguser',
            password: '12345678'
          })
          .expect(201)
          .end((err, res) => {
            expect(res.body.status).to.equal('Failed');
            expect(res.body.message).to.equal('invalid username or password');
            done();
          });
      });
      it('should  not login new user account and return a `400`', (done) => {
        request.post('/api/v1/auth/signup')
          .send({})
          .expect(400)
          .end((err, res) => {
            expect(res.body).deep.equal({
              message: 'All or some of the field is/are undefined'
            });
            done();
          });
      });
      it('should  not login a new user account and return a `400`', (done) => {
        request.post('/api/v1/auth/signin')
          .send({
            username: '',
            password: ''
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.username).to.equal('username  is required');
            expect(res.body.errors.password).to.equal('password  is required');
            done();
          });
      });
      it('should  not login a new user account and return a `400`', (done) => {
        request.post('/api/v1/auth/signin')
          .send({
            username: 'h',
            password: 'dddd'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.username).to.equal('username must be between 2 to 100 characters');
            expect(res.body.errors.password).to.equal('password must be eight character or more');
            done();
          });
      });
    });
  });
  describe('All test cases for adding entry to the application', () => {
    describe('All  test cases of wrong input for adding entry ', () => {
      it('should return a `400` status code with res.body error message', (done) => {
        request.post('/api/v1/entries')
          .set('Content-Type', 'application/json')
          .send({
            title: '3rd holiday',
            date: '23-11-2017',
            entry: 'very fun'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.title).to.equal('Entry title must not contain numbers');
            expect(res.body.errors.entry).to.equal('Diary entry provided must be between 10 to 2000 characters');
            if (err) done(err);
            done();
          });
      });
      it('should return a `400` status code with res.body error message', (done) => {
        request.post('/api/v1/entries')
          .set('Content-Type', 'application/json')
          .send({
            title: '',
            date: '',
            entry: ''
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.title).to.equal('Title of entry is required');
            expect(res.body.errors.date).to.equal('date is required');
            expect(res.body.errors.entry).to.equal('Diary entry is required');
            if (err) done(err);
            done();
          });
      });
      it('should return a `400` status code with res.body error message', (done) => {
        request.post('/api/v1/entries')
          .set('Content-Type', 'application/json')
          .send({})
          .expect(400)
          .end((err, res) => {
            expect(res.body).deep.equal({
              message: 'All or some of the field is/are undefined'
            });
            if (err) done(err);
            done();
          });
      });
    });
    describe('Test case of correct input for adding entry ', () => {
      it('should return a `201` status code with res.body success message', (done) => {
        request.post('/api/v1/entries')
          .set('Content-Type', 'application/json')
          .send({
            date: '13-22-2017',
            entry: 'Reflection describes a real or imaginary scene, event, interaction, passing thought, memory',
            title: 'panther partytwo'
          })
          .expect(201)
          .end((err, res) => {
            expect(res.body).deep.equal({
              status: 'Success',
              message: 'Successfully added new entry',
              entryData
            });

            if (err) done(err);
            done();
          });
      });
    });
  });
  describe('All test cases for updtating diary entries', () => {
    describe('All  test cases of wrong input for updting entries ', () => {
      it('should return a `400` status code with res.body error message', (done) => {
        request.put('/api/v1/entries/3')
          .set('Content-Type', 'application/json')
          .send({
            title: '3rd holiday',
            entry: 'very fun'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.title).to.equal('Entry title must not contain numbers');
            expect(res.body.errors.entry).to.equal('Diary entry provided must be between 10 to 2000 characters');

            if (err) done(err);
            done();
          });
      });
      it('should return a `400` status code with res.body error message', (done) => {
        request.put('/api/v1/entries/9')
          .set('Content-Type', 'application/json')
          .send({
            title: 'june holiday',
            date: '09-12-2108',
            entry: 'very fun and infomative'
          })
          .expect(404)
          .end((err, res) => {
            expect(res.body).deep.equal({
              status: 'Failed',
              message: 'entry id does not exist'
            });
            if (err) done(err);
            done();
          });
      });
    });
    describe('All  test cases of correct input for updating entries ', () => {
      it('should return a `200` status code with res.body success message', (done) => {
        request.put('/api/v1/entries/3')
          .set('Content-Type', 'application/json')
          .send({
            title: 'june holiday',
            date: '09-12-2108',
            entry: 'very fun and infomative'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).deep.equal({
              status: 'Success',
              message: 'Successfully updated  your entry',
              entryData
            });
            if (err) done(err);
            done();
          });
      });
    });
  });
  describe('test case for retriving all entry in the diary', () => {
    it('should return `200` status code with `res.body` success messages', (done) => {
      request.get('/api/v1/entries')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).deep.equal({
            status: 'Success',
            message: `Successsfully retrieved all diary entries with total of ${entryData.length} entries`,
            entryData
          });
          if (err) done(err);
          done();
        });
    });
  });
  describe('test case for retriving an entry in the diary', () => {
    it('should return `200` status code with `res.body` success messages', (done) => {
      request.get('/api/v1/entries/2')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).deep.equal({
            status: 'Success',
            message: 'Successfully retrieve an entry',
            Entry: entryData[1]
          });
          if (err) done(err);
          done();
        });
    });
    it('should return `200` status code with `res.body` error messages', (done) => {
      request.get('/api/v1/entries/9')
        .set('Content-Type', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body).deep.equal({
            status: 'Failed',
            message: 'Page not found'
          });
          if (err) done(err);
          done();
        });
    });
  });
  describe('test case for deleting an entry in the diary', () => {
    it('should return `200` status code with `res.body` success messages', (done) => {
      request.delete('/api/v1/entries/2')
        .set('Content-Type', 'application/json')
        .expect(200)
        .end((err, res) => {
          expect(res.body).deep.equal({
            status: 'Success',
            message: 'Successfully deleted entry',
            entryData
          });
          if (err) done(err);
          done();
        });
    });
    it('should return `400` status code with `res.body` error messages', (done) => {
      request.delete('/api/v1/entries/9')
        .set('Content-Type', 'application/json')
        .expect(400)
        .end((err, res) => {
          expect(res.body).deep.equal({
            status: 'failed',
            message: 'events id does not exist',
          });
          if (err) done(err);
          done();
        });
    });
  });
});
