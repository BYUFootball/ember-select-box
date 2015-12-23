# ember-cli-select-box

This Ember CLI addon provides you with a native HTML select box component. But, it also comes with a faux-select box made from divs.

### Installation
```
ember install ember-cli-select-box
```

### Native select box

Basic usage:

```handlebars
{{#select-box/native as |sb|}}
  {{sb.option value=1 label='One'}}
  {{sb.option value=2 label='Two'}}
  {{sb.option value=3 label='Three'}}
{{/select-box/native}}
```
Options will be marked as `selected` automatically based on the `value` attribute.

### Faux select box

Basic usage:

```handlebars
{{#select-box as |sb|}}
  {{sb.option value=1 label='One'}}
  {{sb.option value=2 label='Two'}}
  {{sb.option value=3 label='Three'}}
{{/select-box}}
```

The selected item will have a class name `is-selected`

#### Usage

Attributes

* `value` this value is used to determine which option is selected
* `multiple` if true, `value` should be an array
* `disabled` if true adds an `is-disabled` class 
* `is-open` if true adds an `is-open` class
* `on-select` will be fired when an option is clicked, or enter is pressed.
* `on-after-select` useful for being able to inspect the new state of the select box after a selection has been made.
* `on-ready` fired when all options have rendered
* `on-search` fired when the select box decides to run a search
* `search-min-chars` prevents the on-search action from firing until there are enough chars
* `search-delay-time` milliseconds to debounce the on-search action from firing
* `search-slow-time` milliseconds considered for a search to be taking too long
* `class-prefix` adds a prefix to the class name of all child select-box components
* `on-click-outside` useful for closing the select box
* `on-press-backspace`
* `on-press-tab`
* `on-press-enter`
* `on-press-escape`
* `on-press-left`
* `on-press-up`
* `on-press-right`
* `on-press-down`

Yielded API

* `sb.isSearching` whether the promise return from the `on-search` action is running
* `sb.isSlowSearch` true if the search was taking a while
* `sb.open` opens the select box, adding `is-open` class name
* `sb.close` closes the select box removing the `is-open` class name
* `sb.toggle` opens or closes the select box
* `sb.select` selects an arbitrary value and fires the `on-select` action
* `sb.update` updates the selected value, but does not fire the `on-select` action
* `sb.selectActiveOption` selects the value of whichever option is currently active
* `sb.search` runs an arbitrary search using the search function provided by `on-search`
* `sb.setInputValue` lets you update the input value, useful for when a selection has been made
* `sb.focusInput`
* `sb.activateOptionAtIndex` adds an `is-active` class to the option at the index
* `sb.activateNextOption` activates the next option (pass in true to scroll if necessary too)
* `sb.activatePreviousOption` as above but reverse
* `sb.deactivateOptions` makes no option be active
* `sb.activateSelectedOptionAtIndex` activates the selected option at the index
* `sb.activateNextSelectedOption` activates the next selected option
* `sb.activatePreviousSelectedOption` as above but reverse
* `sb.deactivateSelectedOptions` makes no selected option be active

###### Option


```handlebars
{{sb.option value=1 label='One'}}
{{sb.option value=2}}Two{{/sb.option}}
{{sb.option value=3 component='my-option'}}
```

Attributes

* `on-select` useful for firing one-off actions when an option is selected
* `value` can be anything
* `label` used as the display text
* `component` name of a component to use for the option's display text

Yielded API

* `o.value` the value of the option
* `o.label` the label of the option
* `o.index` the index of the option amongst the options


###### Group

```handlebars
{{sb.group label='Things'}}
  {{sb.option value=thing label=thing.name}}
{{/sb.group}}
```

Self explanitory, just wraps the options in extra markup.


###### Options

```handlebars
{{#sb.options}}
  {{sb.option value=1 label='One'}}
  {{sb.option value=2 label='Two'}}
{{/sb.options}}
```

You only need to wrap the options up in with `sb.options` if you require extra markup for styling, or you want the options to be navigatable.


###### Input

```handlebars
{{sb.input}}
```

Attributes

* `on-input` fired when text is input
* `on-delete` fired when there is no text, but backspace is pressed
* `on-clear` fired when text is cleared


###### Selected option

```handlebars
{{sb.selected-option}}
```

Does not render the selected option automatically, but rather just provides a way for you to render the option(s) that have been selected.

###### Selected options

```handlebars
{{#sb.selected-options}}
  {{#sb.selected-option}}You chose this{{/sb.selected-option}}
  {{#sb.selected-option}}And this{{/sb.selected-option}}
{{/sb.selected-options}}
```

Provides a container for options that the user selected. Does not do anything by default, but it is possible to activate selected options using the API, thereby allowing you to create your own navigatable select box.

#### Customising

1. We recommend you compose your own select box like so:

```handlebars
{{#select-box value=attrs.value on-select=attrs.on-select class-prefix='my' as |sb|}}}
  <button onclick={{action sb.toggle}}>Toggle</button>
  {{sb.selected-option label=sb.value.name}}
  {{yield sb}}
{{/select-box}}
```

...and then use it like so:

```handlebars
{{#my-select value=thing on-select=action('selectedAThing') as |sb|}}
  {{#each things as |thing|}}
    {{sb.option value=thing label=thing.name}}
  {{/each}}
{{/my-select}}
```

Will render...

```html
<div class="my-select">
  <div class="my-select-box">
    <div class="my-select-box-selected-option">Foo</div>
    <div class="my-select-box-option">Foo</div>
    <div class="my-select-box-option">Bar</div>
    <div class="my-select-box-option">Baz</div>
  </div>
</div>
```

2. If you need even more flexibility, you can extend the select box:

```javascript
let MySelectBox = SelectBox.extend({
  click() {
    this.send('toggle');
  }
})
```

3. If you need _even more_ flexibility you can create your own select box using the mixins

```javascript
let MySelectBox = Component.extend(BaseSelectBox, Toggleable, Searchable);
```
