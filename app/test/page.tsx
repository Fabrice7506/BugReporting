"use client"
import { reportBug } from '@/lib/reportBug';
import React from 'react'

async function handleBug(){
  const isOk = await reportBug({
  title: "Erreur d'affichage",
  description: "La modale ne se ferme pas après soumission.",
});

if(isOk){
  alert('declanché')
}else{
  alert("error")
}
}

function button() {

    
  return (
     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
       <button onClick={handleBug} className="bg-amber-200 p-4 rounded-full" >declencher le bug</button>
       </main>
      
    </div>
  )
}

export default button