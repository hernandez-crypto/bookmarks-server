const BookService = {
  getAllBooks(knex) {
    return knex.select('*').from('bookmarks');
  },
  insertBookmark(knex, newBook) {
    return knex
      .insert(newBook)
      .into('bookmarks')
      .returning('*')
      .then((rows) => rows[0]);
  },
  getById(knex, id) {
    return knex
      .from('bookmarks')
      .select('*')
      .where('id', id)
      .first();
  },
  deleteBookmark(knex, id) {
    return knex('bookmarks')
      .where({ id })
      .delete();
  },
  updateBookmarks(knex, id, newBookField) {
    return knex('bookmarks')
      .where({ id })
      .update(newBookField);
  },
};

module.exports = BookService;
