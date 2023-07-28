import React from 'react'

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <div className="mysection">{params.slug}</div>
  )
}
