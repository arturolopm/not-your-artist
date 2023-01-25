import { BsSearch } from "react-icons/bs";

function SearchForm(props) {
  const handleSubmit = props.handleSubmit;
  const searchInput = props.searchInput;
  const setSearchInput = props.setSearchInput;
  return (
    <>
      <div className=" text-black flex justify-center p-2 mb-2 ">
        <form
          className=" flex text-sm h-7 md:text-base"
          onSubmit={handleSubmit}>
          <input
            className=" outline-none h-full border-0 rounded-l-lg rounded-r-none  "
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search"></input>
          <button
            className=" h-7 border-2 rounded-r-lg"
            type="submit">
            {" "}
            <BsSearch />
          </button>
        </form>
      </div>
      <hr className=" block border-[1px]" />
    </>
  );
}

export default SearchForm;
