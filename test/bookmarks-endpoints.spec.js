const { expect } = require('chai');
const knex = require('knex');
const app = require('../src/app');
const { makeBookMarksArray } = require('./bookmarks.fixtures');

describe.only('bookmarks endpoints', function() {
  let db;

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db('bookmarks').truncate());

  afterEach('cleanup', () => db('bookmarks').truncate());
  describe('GET /', () => {
    context('Given no bookmarks', () => {
      it('responds with 200 and an empty list', () => {
        return supertest(app)
          .get('')
          .expect(200, []);
      });
      it('responds with 404', () => {
        const bookmarkId = 123456;
        return supertest(app)
          .get(`/${bookmarkId}`)
          .expect(404, { error: { message: 'bookmark doesnt exist' } });
      });
    });
    context('Given there are bookmarks in the database', () => {
      const testBookmarks = makeBookMarksArray();
      beforeEach('insert Bookmarks', () => {
        return db.into('bookmarks').insert(testBookmarks);
      });
      it('GET / responds with 200 and all of the Bookmarks', () => {
        return supertest(app)
          .get('/')
          .expect(200, testBookmarks);
      });
      it('GET /:bookmark_id responds with 200 and the specified bookmark', () => {
        const bookmarkId = 2;
        const expectedbookmark = testBookmarks[bookmarkId - 1];
        return supertest(app)
          .get(`/${bookmarkId}`)
          .expect(200, expectedbookmark);
      });
    });
  });
});
