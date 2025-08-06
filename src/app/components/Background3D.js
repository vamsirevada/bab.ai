'use client'
import React from 'react'

const Background3D = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />

      {/* 3D floating shapes */}
      <div className="absolute inset-0">
        {/* Large floating cubes */}
        <div
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-blue-100/40 to-blue-200/20 transform rotate-12 animate-float-slow shadow-lg rounded-lg backdrop-blur-sm"
          style={{
            animation: 'float-slow 8s ease-in-out infinite',
            transform: 'perspective(1000px) rotateX(45deg) rotateY(45deg)',
          }}
        />

        <div
          className="absolute top-1/3 right-20 w-12 h-12 bg-gradient-to-br from-purple-100/40 to-purple-200/20 transform -rotate-45 animate-float-medium shadow-md rounded-lg backdrop-blur-sm"
          style={{
            animation: 'float-medium 6s ease-in-out infinite',
            transform: 'perspective(800px) rotateX(30deg) rotateY(-30deg)',
          }}
        />

        <div
          className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-gradient-to-br from-green-100/30 to-green-200/15 transform rotate-45 animate-float-fast shadow-xl rounded-xl backdrop-blur-sm"
          style={{
            animation: 'float-fast 4s ease-in-out infinite',
            transform: 'perspective(1200px) rotateX(60deg) rotateY(20deg)',
          }}
        />

        {/* Medium floating spheres */}
        <div
          className="absolute top-2/3 right-1/3 w-10 h-10 bg-gradient-radial from-orange-100/50 to-orange-200/25 rounded-full animate-float-slow shadow-lg backdrop-blur-sm"
          style={{
            animation: 'float-slow 7s ease-in-out infinite reverse',
            transform: 'perspective(900px) rotateX(20deg)',
          }}
        />

        <div
          className="absolute bottom-20 right-10 w-8 h-8 bg-gradient-radial from-pink-100/40 to-pink-200/20 rounded-full animate-float-medium shadow-md backdrop-blur-sm"
          style={{
            animation: 'float-medium 5s ease-in-out infinite',
            transform: 'perspective(700px) rotateY(45deg)',
          }}
        />

        {/* Small floating triangles */}
        <div
          className="absolute top-1/2 left-20 w-6 h-6 bg-gradient-to-br from-cyan-100/50 to-cyan-200/25 transform rotate-45 animate-float-fast shadow-sm backdrop-blur-sm"
          style={{
            clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            animation: 'float-fast 3s ease-in-out infinite',
            transform: 'perspective(600px) rotateX(45deg) rotateZ(45deg)',
          }}
        />

        {/* Floating lines/bars */}
        <div
          className="absolute top-40 right-1/2 w-1 h-16 bg-gradient-to-b from-indigo-200/40 to-indigo-300/20 transform rotate-12 animate-float-slow shadow-sm backdrop-blur-sm"
          style={{
            animation: 'float-slow 9s ease-in-out infinite',
            transform: 'perspective(1000px) rotateX(30deg) rotateZ(12deg)',
          }}
        />

        <div
          className="absolute bottom-40 left-1/2 w-12 h-1 bg-gradient-to-r from-teal-200/40 to-teal-300/20 transform -rotate-12 animate-float-medium shadow-sm backdrop-blur-sm"
          style={{
            animation: 'float-medium 7s ease-in-out infinite reverse',
            transform: 'perspective(800px) rotateY(45deg) rotateZ(-12deg)',
          }}
        />
      </div>

      {/* Subtle overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5" />
    </div>
  )
}

export default Background3D
