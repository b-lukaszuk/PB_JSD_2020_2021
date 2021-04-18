enum Color {
    White,
    Black,
}

function toggleColor(color: Color) {
    return color === Color.White ? Color.Black : Color.White;
}


export { Color, toggleColor };
