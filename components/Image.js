import Image from "next/image";

const myLoader = ({ src }) => {
  return src;
};

const MyImage = (props) => {
  return (
    <Image
      loader={myLoader}
      unoptimized={true}
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      className="rounded m-2 hover:scale-105 ease-out duration-100"
    />
  );
};

export default MyImage;
