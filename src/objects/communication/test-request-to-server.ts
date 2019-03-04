import * as apiEnums from '../../enums/_index';

export interface TestRequestToServer {
  origin: apiEnums.CommunicationOriginEnum;
  type: apiEnums.CommunicationTypeEnum;
  request_id: string;
}
