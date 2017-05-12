# package-loader
Ext JS Dynamic Package Loader

# Requirements
This package is used by Ext JS applications and Sencha Cmd 6.5

- Install [Sencha Cmd](https://www.sencha.com/products/sencha-cmd/)
- Download [Sencha Ext JS](https://www.sencha.com/products/extjs).  We
  recommend extracting Ext JS into a `"sencha-sdks"` folder in your home directory.

## Use In Cmd Application
Simply add `package-loader` to the `'app.json'` file's `requires` array:

    "requires": [
        "package-loader"
    ]

Then build the application

    sencha app build --dev

The `package-loader` package will be automatically downloaded from Sencha's CDN.

# Manual Installation

In most cases you won't need to manually install this package. If you cannot access
the Sencha CDN as part of the app build, you can manually download the files to
your workspace.

Be sure that the `'packages/package-loader'` path is placed in the correct root of
your application or workspace.

# Build

Should you want to build the package yourself, first you will need to setup the
workspace which will need a local copy of Ext JS to build:

    $ sencha workspace install ~/sencha-sdks
    $ cd packages/package-loader
    $ sencha package build
