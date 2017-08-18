# konig-chart

This project uses `webpack` to package a data visualization library and `npm` to manage javascript modules.

For more information about these technologies, 

* [Getting Started with Webpack](https://webpack.github.io/docs/tutorials/getting-started/)
* [NPM Documentation](https://docs.npmjs.com/)

To build this project, you need to do the following tasks:

1. Clone this `konig-chart` repository so that you have a local copy
2. Install `Node.js` and `npm`
3. Install the project dependencies
4. Use `webpack` to build the project

We discuss these steps below.

## Clone `konig-chart`

Run the command

```
git clone git@github.com:konigio/konig-chart.git
```

## Install `npm`

Download and run the [Node.js installer](https://nodejs.org/en/download/).

## Install the project dependencies

In a shell or command prompt, run the following commands:

```
cd konig-chart
npm install
```

## Build the project

Run the following command

```
webpack
```

This will build a dev version of the project and put the output at `dist/js/dataviz.js`.
To create a production build that will minify the output and de-dupe, run `NODE_ENV=production webpack`.