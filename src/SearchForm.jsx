import { BsSearch } from "react-icons/bs";

function SearchForm(props) {
  const handleSubmit = props.handleSubmit;
  const searchInput = props.searchInput;
  const setSearchInput = props.setSearchInput;
  return (
    <div className=" flex justify-center p-2 mb-3 ">
      <form
        className=" text-base h-7 "
        onSubmit={handleSubmit}>
        <input
          className=" h-full border-2  "
          type="text"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Search"
        />
        <button
          className=" px-2 h-full border-2 rounded-r-lg"
          type="submit">
          {" "}
          <BsSearch />
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
