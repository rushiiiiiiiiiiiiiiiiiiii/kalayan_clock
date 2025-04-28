import './Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to Kaalaayan</h1>
      <h2 className="home-tagline">
        कालायन - <span>"यही समय है, सही समय है!"</span>
      </h2>
      <p className="home-description">
        A humble approach to enhance human lifestyle with ancient Indian knowledge and modern science.
      </p>
    </div>
  );
}

export default Home;
