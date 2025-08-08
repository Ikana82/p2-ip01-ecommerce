import { useEffect, useRef } from "react";

const UploadWidget = ({ setImageUrl }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "db2ylyoke",
        uploadPreset: "fern-phase2",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          console.log("Upload Successfull:", result.info.secure_url);
          setImageUrl(result.info.secure_url);
        }
      }
    );
  }, []);

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          widgetRef.current.open();
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default UploadWidget;
