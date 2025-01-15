import React from 'react'
import Image from 'next/image'
export default function SuccessGreetPopup({ popupClose, IconImage, Greetheading, GreetDesc }) {

    return (
        <>
            <div className="greet-modal">
                <div className="greet-modal-body p-3 rounded border text-center">
                    <div className="icon pb-1">
                        <Image src={IconImage || ""} height={50} width={50} alt={IconImage} />
                    </div>
                    <div className="content-body">
                        <h2 className='fs-3 pb-2 fw-semibold'>{Greetheading}</h2>
                        <p>{GreetDesc}</p>
                    </div>
                    <button onClick={popupClose} type='button' className='cm-button'>Ok</button>
                </div>
            </div>
        </>
    )
}
// Your Account has been successfully created!
// /assets/images/check.png