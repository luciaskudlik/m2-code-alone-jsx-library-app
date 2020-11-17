const React = require("react");

function AddAuthor(props) {
  return (
    <form action={`/authors/add?bookid=${props.idOfTheBook}`} method="POST">
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
  );
}

module.exports = AddAuthor;
