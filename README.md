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
2. [gw-select-tree](#gw-select-tree)

---

## gw-select

A fancier "select" element based on Bootstrap's Dropdown Buttons.

**Usage:**

``gw-selected``: Object where the currently selected element will be bound to.
``gw-elements``: Object array with all the elements to be shown.
``gw-label``: The name of the object property with the elements label.
``gw-show="true"``: Always show the elements.

To add a filter to the ``gw-select`` just set the ``gw-filter`` attribute to whatever expression you wish to use as filter.

## gw-select-tree

Similar to [gw-select](#gw-select) but for tree-shaped data. This directive was based on [angular.treeview](http://github.com/eu81273/angular.treeview) by Ahn Jae-Ha and modified to fit the purpose of using Bootstrap's dropdown.

**Usage:**

In addition to ``gw-selected``, ``gw-show``, and ``gw-filter``, to use this element the following attributes are needed:

``gw-tree-root``: Attribute name of the tree's root element(s).
``gw-tree-id``: Tree name.
``gw-node-id[="id"]``: Attribute of the nodes ID.
``gw-node-label[="label"]``: Attribute of the nodes label.
