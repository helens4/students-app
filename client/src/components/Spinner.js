import React from 'react'

const Spinner = () => {
    return (
        <div className='spinner-parent'>
            <div className='spinner'>
                <lottie-player
                    src="https://assets7.lottiefiles.com/packages/lf20_vfgaeen1.json"
                    background="transparent"
                    speed="1"
                    loop autoplay>
                </lottie-player>
            </div>
        </div>
    )
}

export default Spinner