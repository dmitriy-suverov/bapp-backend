import { Inject, Injectable } from '@nestjs/common';
import { Connection, getConnection } from 'typeorm';

@Injectable()
export class TestingService {
  constructor(@Inject('Connection') public connection: Connection) {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error('Test utils only for tests');
    }
  }

  tables = [];

  async closeDbConnection() {
    if (this.connection.isConnected) {
      await (await this.connection).close();
      await getConnection('mongodb').close();
    }
  }

  async reloadFixtures(data) {
    await this.cleanAll();
    await this.loadAll(data);
  }

  async cleanAll() {
    const queries = [`SET FOREIGN_KEY_CHECKS=0;`];
    for (const table of this.tables) {
      queries.push(`TRUNCATE ${table};`);
    }
    queries.push(`SET FOREIGN_KEY_CHECKS=1;`);
    await this.connection.query(queries.join('\n'));
  }

  async loadAll(data) {
    const tables = Object.keys(data);
    const queries = [`SET FOREIGN_KEY_CHECKS=0;`];
    for (const table of tables) {
      const items = data[table];
      if (!items.length) {
        continue;
      }
      const columns = Object.keys(items[0]);
      const values = items.map(item => {
        const sqlValues = Object.values(item)
          .map(value => {
            if (value === null) {
              return 'NULL';
            } else if (typeof value === 'boolean') {
              return +value; // true => 1, false => 0
            } else {
              return `"${value}"`;
            }
          })
          .join(',');
        return `(${sqlValues})`;
      });
      queries.push(
        `INSERT INTO ${table} (${columns.join(',')}) VALUES ${values.join(
          ',',
        )};`,
      );
    }
    queries.push(`SET FOREIGN_KEY_CHECKS=1;`);
    await this.connection.query(queries.join('\n'));
  }
}
