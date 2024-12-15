"use client"

import Image from "next/image"
import RegisterForm from "@/components/registerForm"
import bgImage from "@/public/images/auth/bg-2.jpg"
import line from "@/public/images/auth/line.png"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      <div className="relative hidden w-1/2 lg:block">
        <Image
          src={bgImage}
          alt="Background"
          className="h-full w-full object-cover"
          priority
        />
      </div>
      <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
        <div className="w-full max-w-[26rem] p-4">
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
