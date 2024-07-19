import './Pagination.scss'
import ReactPaginate from 'react-paginate'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	pageCount: number,
	updatePage: (page: number) => void
}

function Pagination({ pageCount, updatePage }: Props) {

	function handlePageClick(event: any) {
		console.log(`Selected: ${event.selected}`)
		updatePage(event.selected)
	}

	return (
		<ReactPaginate
			className='react-paginate'
			previousLabel={<FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>}
			breakLabel="..."
			nextLabel={<FontAwesomeIcon icon={faArrowRight}></FontAwesomeIcon>}
			pageCount={pageCount}
			onPageChange={handlePageClick}
			pageRangeDisplayed={5}
			renderOnZeroPageCount={null}
		></ReactPaginate>
	)
}

export default Pagination