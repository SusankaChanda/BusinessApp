interface ImageFieldProps {
  name: string;  
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  image?: string | null;
}

const ImageField: React.FC<ImageFieldProps> = ({ name, error, onChange, image }) => {
  return (
    <div className="col-12 profile-container">
      <p className={`input-field-name ${error && "color"}`}>{name}</p>  
      <div className="profile-pic-main-upload">
        <label htmlFor="file-input" className="profile-pic-sub-upload">
          {image ? (
            <img src={image} alt="Uploaded" className="uploaded-image" />
          ) : (
            <>
              <i className="fa-solid fa-cloud-arrow-up file-upload-icon"></i>
              <p className="upload-pic-text">Click to Upload</p>
            </>
          )}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onChange}
          style={{ display: "none" }}
          id="file-input"
        />
      </div>
    </div>
  );
};

export default ImageField;
