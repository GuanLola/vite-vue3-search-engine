import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import XlsxJsStyle from "xlsx-js-style";

export function createWs(data, fields, titles, key) {
  const wsObj = {
    name: key,
  };
  const resource = data;
  const ws = XLSX.utils.json_to_sheet(resource, {
    header: fields,
  });

  // 每个Excel单元格的样式设置
  const wsArray = Object.keys(ws).sort();
  for (let key = 0; key < wsArray.length; key++) {
    const wsItem = ws[wsArray[key]];
    if (wsItem instanceof Object) {
      wsItem.s = {
        font: {
          name: "宋体",
          sz: 9,
          color: {
            auto: 1,
          },
        },
        border: {
          color: {
            auto: 1,
          },
          top: {
            style: "thin",
          },
          bottom: {
            style: "thin",
          },
          left: {
            style: "thin",
          },
          right: {
            style: "thin",
          },
        },
        alignment: {
          wrapText: 1,
          horizontal: "center",
          vertical: "center",
          indent: 0,
        },
      };
    }
  }

  const range = XLSX.utils.decode_range(ws["!ref"]);
  console.log("range", range);

  let styleSwitch = 0;
  for (let c = range.s.c; c <= range.e.c; c++) {
    const header = XLSX.utils.encode_col(c) + "1";
    const headerRow2 = XLSX.utils.encode_col(c) + "2";
    console.log("***", ws[header].v);
    ws[header].v = titles[ws[header].v];

    const style = {
      font: {
        name: "宋体",
        sz: 9,
        color: {
          auto: 1,
        },
      },
      border: {
        color: {
          auto: 1,
        },
        top: {
          style: "thin",
        },
        bottom: {
          style: "thin",
        },
        left: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },

      fill: {
        fgColor: { rgb: "9BBB59" },
      },
    };
    if (ws[header].v) {
      styleSwitch += 1;
      if (styleSwitch % 2 === 0) {
        style.fill.fgColor.rgb = "C3D69B";
      } else {
        style.fill.fgColor.rgb = "9BBB59";
      }
    }

    const style2 = {
      font: {
        name: "宋体",
        sz: 9,
        color: {
          auto: 1,
        },
      },
      border: {
        color: {
          auto: 1,
        },
        top: {
          style: "thin",
        },
        bottom: {
          style: "thin",
        },
        left: {
          style: "thin",
        },
        right: {
          style: "thin",
        },
      },
      alignment: {
        horizontal: "center",
        vertical: "center",
      },

      fill: {
        fgColor: { rgb: "9BBB59" },
      },
    };
    if (ws[headerRow2]?.v === "达人") {
      style2.fill.fgColor.rgb = "C3D69B";
    }
    if (styleSwitch % 2 === 0) {
      style2.fill.fgColor.rgb = "C3D69B";
    } else {
      style2.fill.fgColor.rgb = "9BBB59";
    }

    ws[header].s = style;

    if (ws[headerRow2]) {
      ws[headerRow2].s = style2;
    }
  }

  if (!ws["!merges"]) ws["!merges"] = [];
  ws["!merges"].push(XLSX.utils.decode_range("A1:A2"));
  let str;
  const merges = [];
  for (let c = range.s.c; c <= range.e.c; c++) {
    if (c) {
      if (str) {
        if (str.split(":").length >= 5) {
          str = XLSX.utils.encode_col(c) + 1;
        } else {
          str = str + ":" + XLSX.utils.encode_col(c) + 1;
          if (str.split(":").length === 5) {
            // 只取头和尾
            const arr = str.split(":");
            const headAndTail = `${arr[0]}:${arr[4]}`;
            merges.push([headAndTail]);
          }
        }
      } else {
        str = XLSX.utils.encode_col(c) + 1;
      }
    }
  }

  //   const merges = [['D1:E1'], ['F1:G1'], ['H1:I1'], ['J1:K1'], ['L1:M1'], ['N1:O1'], ['P1:Q1'], ['R1:S1'], ['T1:U1'], ['V1:W1'], ['X1:Y1'],
  // ['Z1:AA1'], ['AB1:AC1'], ['AD1:AE1'], ['AF1:AG1']]
  if (merges.length > 0) {
    if (!ws["!merges"]) ws["!merges"] = [];
    merges.forEach((a) => {
      a.forEach((item) => {
        ws["!merges"].push(XLSX.utils.decode_range(item));
      });
    });
  }

  wsObj.data = ws;

  return wsObj;
}

export function sheet2Blob(sheet) {
  const workbook = {
    SheetNames: [],
    Sheets: {},
  };

  for (let i = 0; i < sheet.length; i++) {
    if (sheet[i].name) {
      workbook.SheetNames.push(sheet[i].name);
      workbook.Sheets[sheet[i].name] = sheet[i].data;
    }
  }

  const out = XlsxJsStyle.write(workbook, { type: "buffer" });
  return out;
}

export function saveXlsx(ws, filename, zip) {
  try {
    if (zip) {
      return new Blob([ws], { type: "application/octet-stream" });
    }
    FileSaver.saveAs(
      new Blob([ws], { type: "application/octet-stream" }),
      filename
    );
  } catch (e) {
    if (typeof console !== "undefined") console.log(e, ws);
  }
}
