gui-structure-example
===

This project aims to showcase a good and clean structure for web-based projects. Currently it uses the following tools:

* **npm** to install base-tools and run tests
* **gulp** to build the sources and produce the development / distribution artifacts
* **bower** to handle web dependencies such as bootstrap, angular or jquery.

How to initialise the project?
===

After after a clone, simple do:

```
~# cd gui-structure-example
~# npm install
```

This will install all the tools along with the dependencies needed.

How to build the project?
=========================

To build the non-minified version:

```
~# gulp build
```

To build the minified (dist) version:

```
~# gulp build --production
```

All generated files are stored within the `/dist` folder.

How to serve built project
==========================

You can launch a small webserver that will serve you built project by using the command:

```
~# gulp build --serve
```

As the CSS and JS get concatenated (see next section) and minified (for the dist version), there is a gulp flag parameter
that will setup watch tasks for any changes within the source files and automatically launches the right process(es).
To use it, simple append `--watch` to the build command:

```
~# gulp build [--other-flags] --watch
```

How the CSS gets compiled?
==========================

This project uses [less](http://lesscss.org/) as a CSS pre-processor. Gulp grab the `/src/main/app/less/public.less` file and
compiles the CSS based on that into `/dist/css/public(.min).css`. If you want to customise what goes into the generated CSS,
please read the instructions within the less file.

How the JS gets compiled?
=========================

By default, this project will grab all `*.js` files within the folders `/src/main/app/js` and `/bower_components/bootstrap/js`, 
and process them into `/dist/js/public(.min).js`. You can customise this list by modifying the variable `jsFilesList` within `gulpfile.js`.