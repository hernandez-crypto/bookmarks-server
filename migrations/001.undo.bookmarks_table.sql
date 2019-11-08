DROP TABLE IF EXISTS bookmarks_table;
DROP TABLE IF EXISTS bookmarks;

psql -U dunder_mifflin -d bookmarks-test -f ./migrations/001.do.bookmarks.sql