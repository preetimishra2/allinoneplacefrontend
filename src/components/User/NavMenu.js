import React, { useState, useContext } from "react";
import { CAT2 } from "../../CONSTANTS/Categories";
import "./NavMenu.css"; // Custom styles
import AppContext from "../../ContextProvider";

export default function NavMenu() {
  const {
    listOfAllProducts,
    setCurrentlyShowingProducts} = useContext(AppContext)
  const [hoveredMain, setHoveredMain] = useState(null);
  const [hoveredSub, setHoveredSub] = useState(null);
  const [currentlyShowingCategory, setCurrentlyShowingCategory] = useState("")

  // const { setSearchProduct } = useContext(AppContext)

  const NavMenuHeadingClickedHandler = (cat) => {
    if (currentlyShowingCategory === cat.title) {
      setCurrentlyShowingProducts(listOfAllProducts)
      setCurrentlyShowingCategory("")
    } else {
      console.log("here its running") 
      setCurrentlyShowingCategory(cat.title)
      const filteredProducts = listOfAllProducts.filter(product => (
        product.category.toLowerCase() === cat.title.toLowerCase()
      ))
      setCurrentlyShowingProducts(filteredProducts)
    }


  }

  return (
    <div className="nav-container">
      {CAT2.map((cat, i) => (
        <div
          key={i}
          // value={cat.title}
          className={ cat.title === currentlyShowingCategory ? "nav-item-selected" : "nav-item"}
          onClick={() => NavMenuHeadingClickedHandler(cat)}
          onMouseEnter={() => setHoveredMain(i)}
          onMouseLeave={() => setHoveredMain(null)}
        >
          {cat.title}

          {hoveredMain === i && cat.subcategories.length > 0 && (
            <div className="dropdown">
              {cat.subcategories.map((sub, j) => (
                <div
                  className="dropdown-item"
                  key={j}
                  onMouseEnter={() => setHoveredSub(j)}
                  onMouseLeave={() => setHoveredSub(null)}
                >
                  {sub.title}
                  {sub.subitems && hoveredSub === j && (
                    <div className="nested-dropdown">
                      {sub.subitems.map((item, k) => (
                        <div key={k} className="nested-item">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
