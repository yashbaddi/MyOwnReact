export function render(element, container) {
  element.props.forEach((child) => {
    // console.lchildrenog(child);
    if (child !== undefined) render(child, DOMElement);
  });

  container.append(DOMElement);
}
