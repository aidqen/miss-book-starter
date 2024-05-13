const { useState } = React

export function LongTxt({desc, length = 100}) {
    const [isLong, setIsLong] = useState(false)

    function setTxtLength() {
        setIsLong((prevState) => !prevState)
    }

    return <p>
        Description: <span>{isLong ? desc : desc.substring(0, length)}</span>
        <span className="read-more" onClick={setTxtLength}>{isLong ? '  Read less...' : '  Read more...'}</span>
    </p>
}