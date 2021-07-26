# giphy-challenge

## Dev Notes
Hi, so this is my code challenge, i gottta say my knowledge of vue was and still is very limited, lets not talk about nuxt tho its really notable how inspired by Next it is. 

Still I enjoy the like HTML, CSS and JS approach, however i want to note that most of my problems with it came from trying to implement typescript, i gotta say that most of what
looks like bad and messy code its due to workarounds or failed implementations of TS, asuming that Nuxt was easily integrated with TS was a mistake (maybe due to limited knowledge of vue 3 using TS natively).

My focus was to try and replicate current giphy api tho of course there are many things that are missing, i also focused more on the SSR of the app than the actual optimization on client side.
This is why request are whenever navigation dictates and data is not stored in vuex store, only used as context for passing search text values however i did wanted to implement pagination (with scroll) and that would meant to probably
store that data in vuex.

I also ended up using home page as both search results page and trending tho i did add a separated page for trending, intially my intention was to have small sections in home page showing trending and catefories maybe, at the end 
i had no time to research what else could i add to home page and implement it.

I did split components in a way they could be reused but i think there is way too much room for improvement in many of those and a lot of things that could be componentized.


I tried to cover all the requirements and add a bit of extra stuff but really i lost a lot of time going back and forth with Nuxt, Vue and TS docs and implementing some stuff in different ways. 

To build and run i will leave the Nuxt section of readme since it is the process of create-nuxt-app.

To navigate:

Home page shows trending and has a link to actual trending page, by doing a search you will navigate back to home but with a search query param, the param is used to update the searchText state and to initiate a search, this will also swap 
the trending grid in home page for the results grid, this should also work by entering the url directly or disabling js on the browser.

By clicking any gif yoy will navigate to the detail.

In here i noticed that api neither provided tags or any kind of related info for the current gif so for tags i mocked them splitting the title, for related i did a new search usinf gif title as well.

Some gifs do not have a user object so instead they just have a source link, wich is displayed always, however if there is a user object, user details should render and have links to social (found that only instagram accounts come back) as well
as giphy profile and giphy image on title.

There is way too much room for improvement but i think this also covers all requirements (at least non optional, gonna look if i can deploy to somewhere).

App should be accesible in [this link](https://giphy-challenge-rcdsp-om9q2.ondigitalocean.app/).


## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
