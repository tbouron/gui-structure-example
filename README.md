gui-structure-example
===

This project aims to showcase a good and clean structure for web-based projects. Currently it uses the following tools:

* **npm** to install base tools and run tests
* **grunt** to build the sources and produce the distributions artifacts
* **bower** to handle web dependencies such as bootstrap or jquery. *All dependencies are downloaded into `assets/vendors`*

How to initialise the project?
===

After after a clone, simple do

```
~# cd gui-structure-example
~# npm install
```

This will install all the tools along with the dependencies needed

How to build the project?
===

To build the non-minified version

```
~# grunt dev
```

To build the minified (dist) version

```
~# grunt dist
```

As the CSS and JS get concatenated (see next section) and minified (for the dist version), there is a grunt task that watch
for any changes within the source file and automatically launch the right process if there is one modification. To use it, simple do:

```
~# grunt watch
```

How the CSS get compiled?
===

This project uses [less](http://lesscss.org/) as a CSS pre-processor. Grunt grab the `assets/less/public.less` file and
compiles the CSS based on that. If you want to customise what goes into the generated CSS, please read the instruction within this file.

How the JS get compiled?
===

By default, this project will grab all *.js file contains within the folders `assets/js` and `assets/vendors/bootstrap/js`, 
and process them. You can customise this list by modifying the variable `jsFileList` within `gruntfile.js`.