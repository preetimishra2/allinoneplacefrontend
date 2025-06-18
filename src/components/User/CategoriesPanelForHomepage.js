// import React, { useState } from 'react'
// import { CAT2 } from '../../CONSTANTS/Categories'
// import './CategoriesPanelForHomepage.css'
// // import '../User/NavMenu.css'

// export const CategoriesPanelForHomepage = () => {

//   return (
//     <div
//       className="categories-panel-for-homepage-container"
//     >
//       {CAT2.map((category, index) => (
//         <CategoryView key={index}
//           index={index}
//           category={category}
//         >
//           {category.title}
//         </CategoryView>
//       ))}
//     </div>
//   )
// }

// const CategoryView = (props) => {

//   const [hoveredMain, setHoveredMain] = useState(null);
//   const [hoveredSub, setHoveredSub] = useState(null);

//   // console.log(props)


//   return (
//     <div
//       className="category-view"
//       onMouseEnter={() => setHoveredMain(props.index)}
//       onMouseLeave={() => setHoveredMain(null)}
//     >
//       {props.children}
      
//       {hoveredMain === props.index && props.category.subcategories.length > 0 && (
//         <div className="dropdown">
//           {props.category.subcategories.map((sub, j) => (
//             <div
//               className="dropdown-item"
//               key={j}
//               onMouseEnter={() => setHoveredSub(j)}
//               onMouseLeave={() => setHoveredSub(null)}
//             >
//               {sub.title}
//               {sub.subitems && hoveredSub === j && (
//                 <div className="nested-dropdown">
//                   {sub.subitems.map((item, k) => (
//                     <div key={k} className="nested-item">
//                       {item}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }


