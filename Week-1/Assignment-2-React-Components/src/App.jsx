
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Card from "./components/Card.jsx";
import Button from "./components/Button.jsx";
import Form from "./components/Form.jsx";
import "./App.css";

function App() {

  function handleClick() {
    alert("Button clicked successfully!");
  }

  return (
      <div>
        <Header />

        <main>
          <h1>React Components Practice</h1>

          <p>Welcome! This website demonstrates reusable React components.</p>

          <h2>Card Component</h2>

          <div className="cards">
              {[
                  {
                      title: "HTML",
                      description: "HTML is used to structure web pages."
                  },
                  {
                      title: "CSS",
                      description: "CSS is used to style web pages."
                  },
                  {
                      title: "React",
                      description: "React is used to build interactive user interfaces."
                  }
              ].map((item, index) => (
                  <Card
                      key={index}
                      title={item.title}
                      description={item.description}
                  />
              ))}
          </div>

          <h2>Button Component</h2>

          <Button
              text="Click Me"
              onClick={handleClick}
          />

          <Form />
        </main>

        <Footer />
      </div>
  );
}

export default App;
