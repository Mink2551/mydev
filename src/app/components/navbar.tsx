import React, { JSX } from 'react'
import Image from 'next/image'
import Logo from '../../../public/PNGLogo.png'

function navbar({pageStage, pathStage}: {pageStage:string, pathStage:string}): JSX.Element {
    const UniversElement = () => {
        return (
            <div className='flex overflow-hidden items-center text-gray-500'>
                <Image src={Logo} width={60} height={60} alt='Logo'></Image>
                <p className='flex whitespace-nowrap'><span className='text-gray-400 mr-1.5'>Path |</span>{pathStage}</p>
            </div>
        )
    }
  return (
    <div className='flex w-[50%] max-w-[500px] duration-300 hover:min-w-[350px] hover:w-[52%] min-w-[250px] h-[60px] right-0 fixed text-white top-0 bg-palette1 border-b border-l rounded-l-full border-gray-600'>
        {
            pageStage === "Home"? (
                <div>
                    <UniversElement/>
                </div>
            ) 
            : pageStage === "Note"? (
                <div>
                    <UniversElement/>
                </div>
            )
            : pageStage === "Homework"? (
                <div>
                    <UniversElement/>
                </div>
            )
            : pageStage === "Schedule"? (
                <div>
                    <UniversElement/>
                </div>
            )
            : pageStage === "Setting"? (
                <div>
                    <UniversElement/>
                </div>
            )
            : pageStage === "Profile"? (
                <div>
                    <UniversElement/>
                </div>
            )
            :
            ""
        }
    </div>
  )
}

export default navbar
