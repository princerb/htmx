+++
title = "hx-add-cls-elt"
description = """\
  The hx-add-cls-elt attribute in htmx allows you to specify elements that will have classes added \
  to them for the duration of the request. The classes to add are specified by the hx-add-cls attribute."""
+++

The `hx-add-cls-elt` attribute allows you to specify elements that will have classes added to them for the duration of the request. The classes to add are specified by the `hx-add-cls` attribute. The value of `hx-add-cls-elt` can be:

* A CSS query selector of the element to add classes to.
* `this` to add classes to the element itself
* `closest <CSS selector>` which will find the [closest](https://developer.mozilla.org/docs/Web/API/Element/closest)
  ancestor element or itself, that matches the given CSS selector
  (e.g. `closest fieldset` will add classes to the closest to the element `fieldset`).
* `find <CSS selector>` which will find the first child descendant element that matches the given CSS selector
* `next` which resolves to [element.nextElementSibling](https://developer.mozilla.org/docs/Web/API/Element/nextElementSibling)
* `next <CSS selector>` which will scan the DOM forward for the first element that matches the given CSS selector
  (e.g. `next button` will add classes to the closest following sibling `button` element)
* `previous` which resolves to [element.previousElementSibling](https://developer.mozilla.org/docs/Web/API/Element/previousElementSibling)
* `previous <CSS selector>` which will scan the DOM backwards for the first element that matches the given CSS selector.
  (e.g. `previous input` will add classes to the closest previous sibling `input` element)

Here is an example with a button that will add classes to itself during a request:

```html
<button hx-post="/example" hx-add-cls-elt="this" hx-add-cls="disabled bg-black">
    Post It!
</button>
```

When a request is in flight, this will cause the button to have the classes `disabled` and `bg-black` added to it. These classes will be removed when the request completes.

The `hx-add-cls-elt` attribute also supports specifying multiple CSS selectors separated by commas to add classes to multiple elements during the request. Here is an example that adds classes to buttons and text input fields of a particular form during the request:

```html
<form hx-post="/example" hx-add-cls-elt="find input[type='text'], find button" hx-add-cls="disabled bg-black">
    <input type="text" placeholder="Type here...">
    <button type="submit">Send</button>
</form>
```

## Notes

* `hx-add-cls-elt` is inherited and can be placed on a parent element
* Multiple classes can be specified in `hx-add-cls` by separating them with spaces
* Classes are automatically removed when the request completes
* If multiple requests target the same element, the classes will remain until all requests complete

[hx-trigger]: https://htmx.org/attributes/hx-trigger/ 