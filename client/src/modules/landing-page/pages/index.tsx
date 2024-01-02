import api from "../../../core/api/api";

const LandingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
      onClick={() => {
        console.log("clicked");
        api.get("/appointment");
      }}
    >
      <h1>Landing Page</h1>
    </div>
  );
};

export default LandingPage;
