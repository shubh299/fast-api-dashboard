const ProfileCard = ({ imageSrc, name, email }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px",
        width: "175px",
      }}
    >
      <img
        src={imageSrc}
        alt="Profile"
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <div>
        <div className="Name">{name}</div>
        <div style={{ fontSize: "12px", color: "gray" }}>{email}</div>
      </div>
    </div>
  );
};

export default ProfileCard;
