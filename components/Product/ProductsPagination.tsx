import React from 'react'

export default function ProductsPagination({ currentPage, pageSize, totalPages, onChangePage}: any) {
  return (
    <div className=' flex items-center'>
        {totalPages}
        <button onClick={onChangePage(currentPage++)}>+</button>
    </div>
  )
}
