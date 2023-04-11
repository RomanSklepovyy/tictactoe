import { AnyObject } from 'interfaces';

export class RtkQueryUtils {
  static selectListResult(result: AnyObject) {
    const { data, ...restResult } = result;
    const isListResponse = data?.page;
    if (isListResponse) {
      return {
        ...restResult,
        data: data.data ?? [],
        page: data.page,
        total: data.total,
      };
    }
    return result;
  }

  static generateProvidesTagsForListing(tag: string, idKey = 'id') {
    return (result: AnyObject) => {
      const partialListTag = { type: tag, id: 'PARTIAL-LIST' };
      const idTags = result?.data?.map((item: AnyObject) => ({
        type: tag,
        id: item[idKey],
      }));
      return result?.data ? [...idTags, partialListTag] : [partialListTag];
    };
  }
}
