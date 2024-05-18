export function NumberRating({ handleChange }) {

    function onSetRating(newValue) {
        const target = { name: 'rating', value: +newValue };
        handleChange({ target });
    }
     
    return (
        <input type="number"min={0} max={5} onChange={(ev) => onSetRating(ev.target.value)}/>
    )
}