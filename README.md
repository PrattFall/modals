# Modals (or bp-modal)

A simple modal solution using pure JavaScript and CSS.

At the moment, the way you would use it would be to include the `bp-modal.min.js` file (inside "build") in the head of your html file and include the appropriate `modal.css` file.

The code for modals is fairly simple. You can create a very basic modal using the following code structure:

```
<div id="put-anything-here" class="modal">
	<div class="modal-content">
		<p>Any content can go here.</p>
	</div>
</div>
```

Then to create a clickable object that triggers it you just need to add a data attribute called `data-modal` that points to the id of the modal you created to whatever html tag you want. An example being:

```
<p data-modal="above-modals-id">Click me!</p>
```

I also included several (completely rewriteable) default styles for modals. You can change the max width of the modal by giving it the class `modal-small` or `modal-medium`.

You can give the modal a header section by adding a div with the class `modal-header` to the top of your modal like so:

```
<div id="some-kind-of-id" class="modal">
	<div class="modal-header">
		<h2>Fancy</h2>
	</div>
	<div class="modal-content">
		<p>Content here</p>
	</div>
</div>
```

Finally, you can add a "close" button by adding the `model-closeable` class to the modal itself.

```
<div id="whatever" class="modal modal-closeable">
...
</div>
```

There are examples to play with in `build/index.html`.

Remember to run `npm install` and `gulp watch` before changing anything so that it compiles changes!
