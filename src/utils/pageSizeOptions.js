import * as _ from "lodash";

export function getPaginationOption(d = false) {
  let pageSizes = [10, 25, 100];
  if (!d) {
    return pageSizes;
  } else {
    let pjOptions = _.filter(pageSizes, (el) => el < d);
    pjOptions.push(d);
    return pjOptions;
  }
}
