export function DropdownRating({ handleChange, rating }) {

    function onSetRating(newValue) {
        const target = { name: 'rating', value: +newValue };
        handleChange({ target });
    }
     
    return (
        <select onChange={(ev) => onSetRating(ev.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    )
}