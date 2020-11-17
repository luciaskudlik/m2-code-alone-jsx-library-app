const React = require("react");
const Layout = require("./Layout");

function Books(props) {
  return (
    <Layout>
      <h1>Books Page</h1>

      {props.books.map((oneBook) => {
        return (
          <p className="book-title">
            <a
              href={`/books/edit?bookid=${oneBook._id}`}
              className="edit-button"
            >
              EDIT
            </a>
            <a href={`/books/details/${oneBook._id}`}>{oneBook.title}</a>
          </p>
        );
      })}
    </Layout>
  );
}

module.exports = Books;
