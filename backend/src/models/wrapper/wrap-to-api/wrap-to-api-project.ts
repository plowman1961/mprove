import { api } from '../../../barrels/api';
import { entities } from '../../../barrels/entities';
import { helper } from '../../../barrels/helper';

export function wrapToApiProject(project: entities.ProjectEntity): api.Project {
  return {
    project_id: project.project_id,
    connection: project.connection,
    postgres_host: project.postgres_host,
    postgres_port: project.postgres_port,
    postgres_database: project.postgres_database,
    postgres_user: project.postgres_user,
    has_credentials: helper.benumToBoolean(project.has_credentials),
    bigquery_project: project.bigquery_project,
    client_email: project.bigquery_client_email,
    query_size_limit: project.query_size_limit,
    week_start: project.week_start,
    timezone: project.timezone,
    deleted: helper.benumToBoolean(project.deleted),
    server_ts: Number(project.server_ts)
  };
}
