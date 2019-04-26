import chai from 'chai';
import supertest from 'supertest';
import app from '../app';

const { expect } = chai;
const request = supertest(app);
let tokenValue;
const wrongToken = 'dshjjjsjwsjsnsnsnsnsnsns'

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
      it('should create a new user account and return a `201`', (done) => {
        const userInfo = {
          fullname: 'Hammed Noibi',
          username: 'hnobi',
          email: 'hnobi09@yahoo.com',
          password: '12345678'
        };
        request.post('/api/v1/auth/signup')
          .send(userInfo)
          .expect(201)
          .end((err, res) => {
            console.log(res, 'rers-------------------------')
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Successfully created myDiary account');
            expect(res.body.data.username).to.equal('hnobi');
            expect(res.body.data.email).to.equal('hnobi09@yahoo.com');
            if (err) done(err);
            done();
          });
      });
      it('should  check if user already in the database and return a `409`', (done) => {
        const userInfo = {
          fullname: 'Hammed Noibi',
          username: 'hnobi',
          email: 'hnobi09@yahoo.com',
          password: '12345678'
        };
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
      it('should Login  a new user and return a `201`', (done) => {
        const userInfo = {
          username: 'hnobi',
          password: '12345678'
        };
        request.post('/api/v1/auth/signin')
          .send(userInfo)
          .expect(201)
          .end((err, res) => {
            tokenValue = res.body.token;
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('successfull login');
            expect(res.body.data.username).to.equal('hnobi');
            expect(res.body.data.email).to.equal('hnobi09@yahoo.com');
            done();
          });
      });
    });
  });
  describe('All test cases for adding entry to the application', () => {
    describe('All  test cases of wrong input for adding entry ', () => {
      it('should return a `400` status code with res.body error message for wrong or invalid token', (done) => {
        request.post('/api/v1/entries')
          .set('x-access-token', wrongToken)
          .send({
            title: '3rd holiday',
            date: '23-11-2018',
            entry: 'very fun'
          })
          .expect(401)
          .end((err, res) => {
            expect(res.body.status).to.equal('Failed');
            expect(res.body.message).to.equal('Authentication failed. Token is either invalid or expired');
            done();
          });
      });
      it('should return a `400` status code with res.body error message', (done) => {
        request.post('/api/v1/entries')
          .set('x-access-token', tokenValue)
          .send({
            title: '3rd holiday',
            date: '23-11-2018',
            entry: 'very fun'
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.title).to.equal('Entry title must not contain numbers');
            expect(res.body.errors.entry).to.equal('Diary entry provided must be between 10 to 500 characters');
            if (err) done(err);
            done();
          });
      });
      it('should return a `400` status code with res.body error message', (done) => {
        request.post('/api/v1/entries')
          .set('x-access-token', tokenValue)
          .send({
            title: '',
            date: '',
            entry: ''
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.title).to.equal('Title of entry is required');
            expect(res.body.errors.entry).to.equal('Diary entry is required');
            if (err) done(err);
            done();
          });
      });
      it('should return a `400` status code with res.body error message', (done) => {
        request.post('/api/v1/entries')
          .set('x-access-token', tokenValue)
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
      it('should add entry and  return a `201` status code with res.body success message', (done) => {
        request.post('/api/v1/entries')
          .set('x-access-token', tokenValue)
          .set('Accept', 'application/json')

          .send({
            title: 'black panther party',
            date: '10-09-2018',
            entry: 'Reflection describes a real or imaginary scene, event, interaction, passing thought, memory',

          })
          .expect(201)
          .end((err, res) => {
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Successfully added new entry');
            if (err) done(err);
            done();
          });
      });
      it('should also add an entry and  return a `201` status code with res.body success message', (done) => {
        request.post('/api/v1/entries')
          .set('x-access-token', tokenValue)
          .send({
            title: 'blavvk partythird',
            date: '10-10-2018',
            entry: 'describes a real or imaginary scene, event, interaction, passing thought, memory'
          })
          .expect(201)
          .end((err, res) => {
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Successfully added new entry');
            if (err) done(err);
            done();
          });
      });
    });
  });
  describe('test case for retriving all entry in the diary', () => {
    it('should return `200` status code with `res.body` success messages', (done) => {
      request.get('/api/v1/entries')
        .set('x-access-token', wrongToken)
        .expect(401)
        .end((err, res) => {
          expect(res.body.status).to.equal('Failed');
          expect(res.body.message).to.equal('Authentication failed. Token is either invalid or expired');
          done();
        });
    });
    it('should return `200` status code with `res.body` success messages', (done) => {
      request.get('/api/v1/entries')
        .set('x-access-token', tokenValue)
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal('Success');
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
  describe('test case for retriving an entry in the diary', () => {
    it('should return a `400` status code with res.body error message for wrong or invalid token', (done) => {
      request.put('/api/v1/entries/1')
        .set('x-access-token', wrongToken)
        .send({
          title: '3rd holiday',
          date: '23-11-2018',
          entry: 'very fun'
        })
        .expect(401)
        .end((err, res) => {
          expect(res.body.status).to.equal('Failed');
          expect(res.body.message).to.equal('Authentication failed. Token is either invalid or expired');
          done();
        });
    });
    it('should return `200` status code with `res.body` success messages', (done) => {
      request.get('/api/v1/entries/1')
        .set('x-access-token', tokenValue)
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Successfully retrieve an entry');
          done();
        });
    });
    it('should not retrive sigle entry and return `200` status code with `res.body` error messages', (done) => {
      request.get('/api/v1/entries/17')
        .set('x-access-token', tokenValue)
        .expect(404)
        .end((err, res) => {
          expect(res.body).deep.equal({
            status: 'Failed',
            message: 'Entry not found'
          });
          done();
        });
    });
  });
  describe('All test cases for updtating diary entries', () => {
    describe('All  test cases of wrong input for updting entries ', () => {
      it('should return a `400` status code with res.body error message', (done) => {
        request.put('/api/v1/entries/20')
          .set('x-access-token', tokenValue)
          .send({
            title: '3rd holiday',
            entry: 'very fun',
            date: '10-04-2018',
          })
          .expect(400)
          .end((err, res) => {
            expect(res.body.errors.title).to.equal('Entry title must not contain numbers');
            expect(res.body.errors.entry).to.equal('Diary entry provided must be between 10 to 500 characters');
            done();
          });
      });
      it('should return a `400` status code with res.body error message', (done) => {
        request.put('/api/v1/entries/139')
          .set('x-access-token', tokenValue)
          .send({
            title: 'june holiday',
            date: '09-08-2018',
            entry: 'very fun and infomative'
          })
          .expect(404)
          .end((err, res) => {
            expect(res.body).deep.equal({
              status: 'Failed',
              message: 'entry id does not exist'
            });
            done();
          });
      });
    });
    describe('All  test cases of correct input for updating entries ', () => {
      it('should also add an entry and  return a `201` status code with res.body success message', (done) => {
        request.put('/api/v1/entries/2')
          .set('x-access-token', tokenValue)
          .send({
            title: 'pand partythird',
            date: '10-10-2018',
            entry: 'describes a real or imaginary scene, event, interaction, passing thought, memory'
          })
          .expect(201)
          .end((err, res) => {
            expect(res.body.status).to.equal('Success');
            expect(res.body.message).to.equal('Successfully updated  your entry');
            done();
          });
      });
    });
  });
  describe('test case for deleting an entry in the diary', () => {
    it('should  delete an entry and return `200` status code with `res.body` success messages', (done) => {
      request.delete('/api/v1/entries/1')
        .set('x-access-token', tokenValue)
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('Successfully deleted entry');
          done();
        });
    });
    it('should return `400` status code with `res.body` error messages', (done) => {
      request.delete('/api/v1/entries/9')
        .set('x-access-token', tokenValue)
        .expect(400)
        .end((err, res) => {
          expect(res.body).deep.equal({
            status: 'Failed',
            message: 'entry id does not exist',
          });
          done();
        });
    });
    it('should return a `400` status code with res.body error message for wrong or invalid token', (done) => {
      request.delete('/api/v1/entries/1')
        .set('x-access-token', wrongToken)
        .expect(401)
        .end((err, res) => {
          expect(res.body.status).to.equal('Failed');
          expect(res.body.message).to.equal('Authentication failed. Token is either invalid or expired');
          done();
        });
    });
  });
  describe('test case for user details ', () => {
    it('should return `200` status code with `res.body` success messages', (done) => {
      request.get('/api/v1//user/details')
        .set('x-access-token', wrongToken)
        .expect(401)
        .end((err, res) => {
          expect(res.body.status).to.equal('Failed');
          expect(res.body.message).to.equal('Authentication failed. Token is either invalid or expired');
          done();
        });
    });
    it('should return `200` status code with `res.body` success messages', (done) => {
      request.get('/api/v1//user/details')
        .set('x-access-token', tokenValue)
        .expect(200)
        .end((err, res) => {
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('successfull retrived user details');
          expect(res.body.data).to.be.an('object');
          done();
        });
    });
  });
  describe('All  test cases for updating user details ', () => {
    it('should return a `400` status code with res.body error message', (done) => {
      request.put('/api/v1/user/details')
        .set('x-access-token', wrongToken)
        .send({
          fullname: 'Hammed Noibi',
          username: 'hnobi',
          email: 'hnobi09@yahoo.com',
          password: '12345678',
          reminder: '2',
          image: ''
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.status).to.equal('Failed');
          expect(res.body.message).to.equal('Authentication failed. Token is either invalid or expired');
          done();
        });
    });
    it('should return a `400` status code with res.body error message', (done) => {
      request.put('/api/v1/user/details')
        .set('x-access-token', tokenValue)
        .send({
          fullname: 'Hammed Noibi',
          username: 'hnobi',
          email: 'hnobi09@yahoo.com',
          password: '12345678',
          reminder: '2',
          image: ''
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.status).to.equal('Success');
          expect(res.body.message).to.equal('successfully modified your profile');
          expect(res.body.userDetails).to.be.an('object');
          done();
        });
    });
  });
});
