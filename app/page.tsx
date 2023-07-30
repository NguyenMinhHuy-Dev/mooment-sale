// import { useAppSelector } from "./redux/store";
'use client'

import { useAppSelector } from "@/redux/store";

export default function Home() {
  const email = useAppSelector((state) => state.authReducer.value.email);

  return (
    <div className="mysection  min-h-[1500px]">
      Trang home
      <h1>Email: {email}</h1>
    </div>
  )
}
