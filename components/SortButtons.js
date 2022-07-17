const SortButtons = (props) => {
    const hoverAction = "hover:text-blue-500"

  return (
    <div className="flex justify-between mx-2 text-xs w-3/4">
          <button onClick={props.buttonClick} className={hoverAction}>Sort By Date (Most Recent)</button>
          <button onClick={props.buttonClick} className={hoverAction}>Sort By View Count</button>
          <button onClick={props.buttonClick} className={hoverAction}>Sort By Rating</button>
          <button onClick={props.buttonClick} className={hoverAction}>Sort By Relevance</button>
    </div>
  )
}

export default SortButtons;
