import React from 'react'
import { PRODUCT_CATEGORIES } from '../../CONSTANTS/Categories'
import './CategoriesPanelForHomepage.css'

export const CategoriesPanelForHomepage = () => {
  return (
    <div className="categories-panel-for-homepage-container">
      {PRODUCT_CATEGORIES.map((category) => (
                      <CategoryView key={category} value={category}>
                        {/* {category} */}
                      </CategoryView>
                    ))}
    </div>
  )
}

const CategoryView = (props) => {
  return (
    <div className="category-view">
      {props.value}
    </div>
  )
}


