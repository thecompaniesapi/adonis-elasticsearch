## Set the environment variable

Make sure you set the `ES_URL` environment variable in your .env file. This will be used to access your Elasticsearch server.

```bash
ES_URL=http://localhost:9200
```

## Registering the provider

Make sure to register the provider inside `start/app.js` file.

```js
const providers = ["@lecoupa/adonis-elasticsearch/providers/ElasticProvider"];
```

That's all! Now you can use the provider by pulling it from IoC container

```js
const Elastic = use("Elastic");

const response = await Elastic.search({
  index: "my-index",
  body: {
    query: {
      match_all: {},
    },
  },
});
```
