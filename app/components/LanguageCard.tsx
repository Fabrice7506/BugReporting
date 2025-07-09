'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type LanguageType = {
    image : string,
    label : string,
    href : string,
    
}
function LanguageCard({image,label,href}:LanguageType) {
  return (
      <Link href={href} className='group relative block' >
 
        <div className="card bg-gradient-to-br from-base-100 to-base-200 shadow-lg rounded-2xl overflow-hidden border  transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-opacity-25 h-full">
          <figure className="relative w-full aspect-[4/3] overflow-hidden">
            {/* Image avec effet de zoom au hover */}
            <img
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              src={image}
              alt={label}
            />

            {/* Overlay avec effet de fondu */}
            <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
            
            {/* Badge flottant */}
            <div className="absolute bottom-4 right-4">
              <span className="px-3 py-1 bg-white text-gray-900 text-xs font-semibold rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Voir docs
              </span>
            </div>
          </figure>
          
          {/* Titre avec animation */}
          <div className="p-4">
            <h3 className="font-semibold text-lg text-center text-primary group-hover:text-primary transition-colors duration-300">
              {label}
            </h3>
            
            {/* Effet de soulignage animé */}
            <div className="mt-2 relative">
              <div className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent w-0 group-hover:w-full group-hover:left-0 transition-all duration-300 transform -translate-x-1/2 group-hover:translate-x-0"></div>
            </div>
          </div>
        </div>
        
        {/* Effet de halo au hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-2xl"></div>
        </div>
      
    </Link>
  )
}

export default LanguageCard