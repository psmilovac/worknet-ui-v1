import React from "react";
import ButtonMini from "../ui/buttons/ButtonMini";



const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>Pages
      {pages &&
        pages.map((page, index) => (
          <ButtonMini
            key={page}
            onClick={() => setCurrentPage(page)}  // retrun to parent element
            className={page == currentPage ? "button_active" : "button"}
          >
            {page}
          </ButtonMini>
        ))}
    </div>
  );
};

export default Pagination;
