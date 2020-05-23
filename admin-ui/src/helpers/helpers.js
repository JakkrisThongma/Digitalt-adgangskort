import { isEmpty, isEqual, xorWith } from "lodash";
import {
  defaultTheme,
  themeWithFontScaleLevel1,
  themeWithFontScaleLevel2,
  themeWithFontScaleLevel3
} from "../styles";

const helpers = {
  isArrayEqual: (x, y) => isEmpty(xorWith(x, y, isEqual)),

  filterOptions: (arr1, arr2) => {
    return arr1.filter(el1 => {
      return (
        arr2.filter(el2 => {
          return el2.id === el1.id;
        }).length === 0
      );
    });
  },

  dateParser: date => {
    if (Date.parse(date))
      return new Date(date).toLocaleString("no-NO", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      });
    return "";
  },
  extractIdList: (list, fieldName) => {
    return list.map(el => ({ [fieldName]: el.id }));
  },
  getTheme: fontScaleLevel => {
    if (fontScaleLevel === 1) return themeWithFontScaleLevel1;
    if (fontScaleLevel === 2) return themeWithFontScaleLevel2;
    if (fontScaleLevel === 3) return themeWithFontScaleLevel3;
    return defaultTheme;
  }
};

export default helpers;
