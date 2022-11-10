import { request } from "@/utils/service";

class Weibo {
  static getList(params?: any) {
    return request({
      url: "/weibo/ajax/side/hotSearch",
      method: "get",
      params,
    });
  }
}

export { Weibo };
