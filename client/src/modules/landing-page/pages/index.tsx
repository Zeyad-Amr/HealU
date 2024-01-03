import AppLayout from "../../../core/components/AppLayout";

const LandingPage = () => {
  return (
    <AppLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <h1
          onClick={() => {
            console.log("clicked");
            // api.get("/appointment");
          }}
        >
          Landing Page
        </h1>
      </div>
    </AppLayout>
  );
};

export default LandingPage;
