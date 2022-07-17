const PageButtons = (props) => {

  const styling =
    "mx-8 bg-blue-700 text-white py-1 px-3 rounded w-32 my-2 hover:bg-blue-500";

  return (
    <>
      <button onClick={props.prevPage} className={styling}>
        Previous
      </button>
      <button onClick={props.nextPage} className={styling}>
        Next
      </button>
    </>
  );
};

export default PageButtons;
