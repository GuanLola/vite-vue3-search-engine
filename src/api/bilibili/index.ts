import { request } from "@/utils/service";

class Bilibili {
  static getList(params: any) {
    return request({
      url: "/bilibili/x/web-interface/ranking/v2",
      method: "get",
      params,
    });
  }
}

export { Bilibili };
