const React = require("react");
const Layout = require("./Layout");

function AddBook() {
  return (
    <Layout>
      <form action="/books/add" method="POST">
        <label>Title:</label>
        <input type="text" name="title" />
        <br />

        <label>Author:</label>
        <input type="text" name="author" />
        <br />

        <label>Description:</label>
        <input type="text" name="description" />
        <br />

        <label>Rate:</label>
        <input type="number" name="rating" />
        <br />

        <button type="submit">ADD</button>
      </form>
    </Layout>
  );
}

module.exports = AddBook;
