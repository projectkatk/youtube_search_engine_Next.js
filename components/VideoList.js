import Link from "next/link";
import MyImage from "../components/Image";

const VideoList = (props) => {
  return (
    <Link href={`https://www.youtube.com/watch?v=${props.id}`}>
      <a target="_blank">
        <MyImage
          src={props.src}
          width={"200px"}
          height={"150px"}
          alt={props.title}
        />
        <h3 className="w-[200px] ml-2 font-bold hover:text-blue-700">
          {props.title}
        </h3>
        <small className="ml-2">Date Published: {props.publishTime}</small>
      </a>
    </Link>
  );
};

export default VideoList;
