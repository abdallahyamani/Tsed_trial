import {registerProvider} from "@tsed/di";
import {DataSource} from "typeorm";
import {Logger} from "@tsed/logger";
import { ProductModel } from "src/models/ProductModel";
import { SupplierModel } from "src/models/SupplierModel";

export const POSTGRES_DATA_SOURCE = Symbol.for("PostgresDataSource");
export const PostgresDataSource = new DataSource({
  type: "postgres",
  entities: [ProductModel,SupplierModel],
  host: "localhost",
  port: 5432,
  username: "test",
  password: "test",
  database: "prodDB",
  synchronize: true
});

registerProvider<DataSource>({
  provide: POSTGRES_DATA_SOURCE,
  type: "typeorm:datasource",
  deps: [Logger],
  async useAsyncFactory(logger: Logger) {
    await PostgresDataSource.initialize();

    logger.info("Connected with typeorm to database: Postgres");

    return PostgresDataSource;
  },
  hooks: {
    $onDestroy(dataSource) {
      return dataSource.isInitialized && dataSource.close();
    }
  }
});
