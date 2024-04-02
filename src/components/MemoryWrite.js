export default function MemoryWrite( {title, buttonText, onSubmit}) {


    return(
        <div>
            <div className="memory-write-box">
                <div className="memory-write-title">
                    { title }
                </div>
                <div className="memory-write-input-box">
                    <input className="memory-write-input" type="text"  aria-label="title" />
                </div>
            </div>
            
            <div className="memory-write-btn-box">
                <button
                    type="button"
                    className="cloud-button" 
                    onClick={() => onSubmit()}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    )
}