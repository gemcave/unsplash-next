import React from 'react';
import Router from 'next/router';
import Link from 'next/link';

const Pagination = ({ fontSize, currentPage, totalPages, term = '', hrefAddress = '/', marginTop, ...otherProps}) => {
	const actualPages = Math.floor(totalPages / 10);
	const actualTerm = term ? `&term=${term}` : '';
	const actualPage = parseInt(currentPage);

	return (
		<div className="pagination">
			{
				currentPage > 1 && (
						<Link href={`${hrefAddress}?page=1${actualTerm}`}>
							<a>First Page</a>
						</Link>)
			}
			<button
				onClick={() => Router.push(`${hrefAddress}?page=${actualPage > 1 ? actualPage - 1 : 1 }${actualTerm}`)}
				disabled={currentPage <= 1}
			>
				PREV
			</button>
			<button 
				onClick={() => Router.push(`${hrefAddress}?page=${actualPage < totalPages ? actualPage + 1 : 1 }${actualTerm}`)}
				disabled={currentPage === actualPages}>
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
			}
			.pagination button:hover {
				text-decoration: underline;
				cursor: pointer;
			}


		`}</style>
		</div>
	)
};

export default Pagination;