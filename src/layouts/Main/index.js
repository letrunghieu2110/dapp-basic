import "../../App.css";

function Main({ children }) {
  return (
    <main className="main-wrapper">
      <div className="main-inner">{children}</div>
    </main>
  );
}

export default Main;
