# Custom elements for GeoWiz

This is a compilation of custom UI elements for the [GeoWiz][1] platform. This repository is basically the result of my personal continuous learning about AngularJS.

All elements are prefixed with ``gw-``.

#### Dependencies
[Bootstrap][2]
[AngularJS][3]

[1]: http://webgis.ci2.pt "Geographic Information System for a Health Index"
[2]: http://getbootstrap.com
[3]: http://angularjs.org

#### Contents

1. [gw-select](#gw-select)

---

## gw-select

A fancier "select" element based on Bootstrap's Dropdown Buttons.

**API:**

``gw-selected``: Object where the currently selected element will be bound to.
``gw-elements``: Object array with all the elements to be shown.
``gw-label``: The name of the object property with the elements label.
``gw-show="true"``: Always show the elements.

To add a filter to the ``gw-select`` just set the ``gw-filter`` attribute to whatever expression you wish to use as filter.
