export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#faf7f2",
        color: "#111",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <div>
        <h1 style={{ fontSize: "42px", marginBottom: "16px" }}>
          Your Private Chef
        </h1>
        <p style={{ fontSize: "18px", margin: 0 }}>
          Premium chef-prepared meals, made in the chef&apos;s kitchen and delivered fresh.
        </p>
      </div>
    </main>
  );
}
