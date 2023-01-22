function SearchForm(props) {
  const handleSubmit = props.handleSubmit;
  const searchInput = props.searchInput;
  const setSearchInput = props.setSearchInput;
  return (
    <form onSubmit={handleSubmit}>
      <input
        className=" mb-3"
        type="text"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder="Search"
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
