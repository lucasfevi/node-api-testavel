import BooksController from '../../../controllers/books';

describe('Controllers: Books', () => {
  describe('Get all books: getAll()', () => {
    it('should return a list of books', () => {
      const Books = {
        findAll: td.function()
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: "2017-02-08 17:03:55.526 +00:00",
        updated_at: "2017-02-08 17:03:55.526 +00:00"
      }];

      td.when(Books.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);

      return booksController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });
});