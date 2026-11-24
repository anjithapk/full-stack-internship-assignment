
function CategoryFilter({ selectedCategory, setSelectedCategory, categories }) {
    return (
        <select
            className="category-filter"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
        >
            {categories.map((category) => (
                <option key={category} value={category}>
                    {category}
                </option>
            ))}
        </select>
    );
}

export default CategoryFilter;
