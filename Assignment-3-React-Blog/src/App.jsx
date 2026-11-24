
import { useState } from "react";
import Header from "./components/Header";
import BlogCard from "./components/BlogCard";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";
import Footer from "./components/Footer";
import posts from "./posts.json";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...new Set(posts.map((post) => post.category))
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
        selectedCategory === "All" ||
        post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
      <div>
        <Header />

        <main className="container" id="home">
          <section className="hero">
            <h1>Explore Our Blog</h1>
            <p>Discover stories, ideas and knowledge.</p>
          </section>

          <section className="controls" id="blogs">
            <SearchBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <CategoryFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
            />
          </section>

          <section className="blog-grid">
            {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))
            ) : (
                <p className="no-results">No blog posts found.</p>
            )}
          </section>
        </main>

        <Footer />
      </div>
  );
}

export default App;
