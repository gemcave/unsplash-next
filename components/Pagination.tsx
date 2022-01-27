import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
interface PaginationProps {
  fontSize?: number;
  totalPages: number;
  term?: string;
  hrefAddress?: string;
  marginTop?: number;
  currentPage: any;
}

const Pagination: React.FC<PaginationProps> = ({
  fontSize,
  currentPage,
  totalPages,
  term = "",
  hrefAddress = "/",
  marginTop,
  ..._otherProps
}) => {
  const { query, push: routerPush } = useRouter();
  const actualPages = Math.floor(totalPages / 10);
  const actualTerm = term ? `&term=${term}` : "";
  const actualPage = parseInt(currentPage);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [query]);

  const handlePrev = () =>
    routerPush(
      `${hrefAddress}?page=${actualPage > 1 ? actualPage - 1 : 1}${actualTerm}`
    );
  const handleNext = () =>
    routerPush(
      `${hrefAddress}?page=${
        actualPage < totalPages ? actualPage + 1 : 1
      }${actualTerm}`
    );

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <Link href={`${hrefAddress}?page=1${actualTerm}`}>
          <a>First Page</a>
        </Link>
      )}
      <button onClick={handlePrev} disabled={currentPage == 1}>
        PREV
      </button>
      <button onClick={handleNext} disabled={currentPage === actualPages}>
        NEXT
      </button>
      <Link href={`${hrefAddress}?page=${actualPages}${actualTerm}`}>
        <a>Last Page</a>
      </Link>
      <style jsx>{`
        .pagination {
          display: flex;
          align-items: center;
          font-size: ${fontSize ? `${fontSize}px` : "16px"};
          ${marginTop && `margin-top: ${marginTop}px;`}
        }
        .pagination button {
          margin: 0px 10px;
          padding: 15px;
          border: 2px solid #333;
          font-size: ${fontSize ? `${fontSize}px` : "16px"};
          background: transparent;
          outline: none;
        }
        .pagination button:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Pagination;
