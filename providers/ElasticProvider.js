/**************************************************************************
 * IMPORTS
 ***************************************************************************/

// NPM
const { ServiceProvider } = require("@adonisjs/fold");
const { Client } = require("@elastic/elasticsearch");

/***************************z***********************************************
 * PROVIDERS > ELASTIC
 ***************************************************************************/

class ElasticProvider extends ServiceProvider {
  register() {
    this.app.singleton("Elastic", (app) => {
      const elasticUrl = app.use("Adonis/Src/Env").get("ES_URL");
      const client = new Client({ node: elasticUrl });

      // Add paginate method
      client.paginate = this.paginate;

      return client;
    });

    this.app.alias("Adonis/Addons/Elastic", "Elastic");
  }

  paginate(response) {
    const querystring = response.meta.request.params.querystring;
    const params = new URLSearchParams(querystring);

    const total = response.body.hits.total.value;
    const from = parseInt(params.get("from"));
    const size = parseInt(params.get("size")) || 10;

    return {
      total: total,
      perPage: size,
      page: from && size && size !== 0 ? Math.floor(from / size) + 1 : 1,
      lastPage: Math.ceil(total / size),
      data: response.body.hits.hits.map((hit) => hit._source),
    };
  }
}

module.exports = ElasticProvider;
