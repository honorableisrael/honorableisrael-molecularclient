import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface TogglerProps {
    onClick1?: () => void;
    onClick2?: () => void;
    onClick3?: () => void;
    showModal3?: (selectedMilestone: any) => void;
    showModalSub?: (selectedMilestone: any) => void;
    showModal1?: (selectedMilestone: any) => void;
    showModal2?: (selectedMilestone: any) => void;
    makeSpreadCaptain?: (selectedMilestone: any) => void;
    LinkProps?: String;
    linkTitle?: String;
    LinkProps1?: String;
    linkTitle1?: String;
    LinkProps2?: String;
    linkTitle2?: String;
}

export const Toggler: React.FC<TogglerProps> = ({ makeSpreadCaptain, onClick1, onClick2, onClick3, showModal3, showModal2, showModal1, showModalSub, LinkProps, linkTitle, LinkProps1, linkTitle1, LinkProps2, linkTitle2 }) => {
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef < any > (null);

    // Function to handle outside click
    const handleOutsideClick = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        // Adding event listener for outside click
        document.addEventListener('click', handleOutsideClick);

        return () => {
            // Clean up the event listener on component unmount
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    // Function to toggle dropdown visibility
    const handleDropdownToggle = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    return (
        <div className="show dropdown w-[190px]" ref={dropdownRef}>
            <span
                aria-haspopup="true"
                aria-expanded={isDropdownVisible}
                id="dropdown-basic"
                className="dropdown-toggle"
                onClick={(e) => {
                    handleDropdownToggle();
                    if (onClick1) onClick1();
                }}
            >
                <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="#444444" clip-rule="evenodd">
                    <path d="M12 16c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2zm0-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3zm0 1c1.104 0 2 .896 2 2s-.896 2-2 2-2-.896-2-2 .896-2 2-2z" />
                </svg>
            </span>
            {isDropdownVisible && (
                <div
                    x-placement="bottom-start"
                    aria-labelledby="dropdown-basic"
                    data-popper-reference-hidden="false"
                    data-popper-escaped="false"
                    data-popper-placement="bottom-start"
                    className="dropdown-menu show"
                    style={{
                        /* position: "absolute", */
                        inset: "-17px auto auto 0px",
                        width: "172px",
                        margin: "0px",
                        position: "absolute",
                        transform: "translate3d(0px, 38px, 0px)",
                    }}
                >
                    <div className="">
                        {showModal1 && (
                            <span className="dropdown-item" onClick={(data) => showModal1(data)}>
                                Remove
                            </span>
                        )}
                        {showModal2 && ( // Check if showModal3 prop is provided
                            <span
                                title='Edit Milestone'
                                className='ml-1 cursor-pointer dropdown-item'
                                onClick={(data) => {
                                    showModal2(data);
                                }}
                            >
                                Edit
                            </span>
                        )}
                        {
                            LinkProps && (
                                <Link className="dropdown-item" to={`${LinkProps}`}>
                                    {linkTitle}
                                </Link>
                            )
                        }
                        {
                            LinkProps1 && (
                                <Link className="dropdown-item" to={`${LinkProps1}`}>
                                    {linkTitle1}
                                </Link>
                            )
                        }
                        {
                            LinkProps2 && (
                                <Link className="dropdown-item" to={`${LinkProps2}`}>
                                    {linkTitle2}
                                </Link>
                            )
                        }
                        {onClick3 && (
                            <span className="dropdown-item" onClick={onClick3}>
                                Substitute
                            </span>
                        )}
                        {showModal3 && ( // Check if showModal3 prop is provided
                            <span
                                title='Remove Specialist'
                                className='ml-1 cursor-pointer dropdown-item'
                                onClick={(data) => {
                                    showModal3(data);
                                }}
                            >
                                Remove Specialist
                            </span>
                        )}
                        {makeSpreadCaptain && ( // Check if showModal3 prop is provided
                            <span
                                title='Remove Specialist'
                                className='ml-1 cursor-pointer dropdown-item'
                                onClick={(data) => {
                                    makeSpreadCaptain(data);
                                }}
                            >
                                Make Captain
                            </span>
                        )}

                        {showModalSub && ( // Check if showModal3 prop is provided
                            <span
                                title='Remove Specialist'
                                className='ml-1 cursor-pointer dropdown-item'
                                onClick={(data) => {
                                    showModalSub(data);
                                }}
                            >
                                Replace Specialist
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
