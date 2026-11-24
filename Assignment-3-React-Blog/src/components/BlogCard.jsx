
function BlogCard({ post }) {
    return (
        <div className="blog-card">
            <img src={post.image} alt={post.title} />

            <div className="blog-content">
                <span className="category">{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <small>By {post.author}</small>
            </div>
        </div>
    );
}

export default BlogCard;
