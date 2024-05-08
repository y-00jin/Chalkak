import React from 'react';
import '../ToggleSwitch.css'; // CSS 파일 import

const CustomToggleSwitch = ({ checked, onChange, toggleText }) => {
    return (
        <label htmlFor="toggle" className="flex items-center cursor-pointer">

            <div className="mr-3 text-gray-700 font-medium">{toggleText}</div>
            <div className="relative">
                <input
                    id="toggle"
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={onChange}
                />
                <div className={`toggle-track ${checked ? 'toggle-track-on' : ''}`}>
                    <div className={`toggle-thumb ${checked ? 'toggle-thumb-on' : ''}`} ></div>
                </div>
            </div>

        </label>
    );
};

export default CustomToggleSwitch;
