import React, { useState, useEffect } from "react";
import Barchart from "./Barchart";
import "./style.css";

function MergeSort({ arrayProp, doSort, setDoSort, timeout }) {
  const arr = arrayProp;
  const [masterArr, setMasterArr] = useState([]);
  const [activeBars, setActiveBars] = useState([]);

  useEffect(() => {
    setMasterArr(arrayProp);
  }, [arrayProp]);

  useEffect(() => {
    async function sorting() {
      if (doSort) {
        let tempMasterArr = [...masterArr];
        const ans = await mergeSort(arr, 0, arr.length - 1, tempMasterArr);
        setDoSort(false);
      }
    }
    sorting();
  }, [doSort]);

  const mergeTwoSortedLists = async (arr1, arr2, tempMasterArr) => {
    let mergedArr = [];

    await timeout();

    tempMasterArr = [
      ...tempMasterArr.slice(
        0,
        Math.min.apply(
          Math,
          arr1.map((o) => o.idx)
        )
      ),
      ...arr1,
      ...arr2,
      ...arr.slice(
        Math.max.apply(
          Math,
          arr2.map((o) => o.idx)
        ) + 1
      ),
    ];
    setMasterArr([...tempMasterArr]);

    let i = 0,
      j = 0;
    while (i < arr1.length && j < arr2.length) {
      await timeout();
      setActiveBars([arr1[i], arr2[j]]);

      if (arr2[j].num < arr1[i].num) {
        mergedArr.push(arr2[j]);
        j++;
      } else {
        mergedArr.push(arr1[i]);
        i++;
      }

      await timeout();

      tempMasterArr = [
        ...tempMasterArr.slice(
          0,
          Math.min.apply(
            Math,
            arr1.map((o) => o.idx)
          )
        ),
        ...mergedArr,
        ...arr1.slice(i),
        ...arr2.slice(j),
        ...arr.slice(
          Math.max.apply(
            Math,
            arr2.map((o) => o.idx)
          ) + 1
        ),
      ];
      setMasterArr([...tempMasterArr]);
    }

    while (i < arr1.length) {
      await timeout();
      setActiveBars([arr1[i]]);

      mergedArr.push(arr1[i]);
      i++;

      await timeout();

      tempMasterArr = [
        ...tempMasterArr.slice(
          0,
          Math.min.apply(
            Math,
            arr1.map((o) => o.idx)
          )
        ),
        ...mergedArr,
        ...arr1.slice(i),
        ...arr.slice(
          Math.max.apply(
            Math,
            arr2.map((o) => o.idx)
          ) + 1
        ),
      ];
      setMasterArr([...tempMasterArr]);
    }
    while (j < arr2.length) {
      await timeout();
      setActiveBars([arr2[j]]);

      mergedArr.push(arr2[j]);
      j++;

      await timeout();

      tempMasterArr = [
        ...tempMasterArr.slice(
          0,
          Math.min.apply(
            Math,
            arr1.map((o) => o.idx)
          )
        ),
        ...mergedArr,
        ...arr2.slice(j),
        ...arr.slice(
          Math.max.apply(
            Math,
            arr2.map((o) => o.idx)
          ) + 1
        ),
      ];
      setMasterArr([...tempMasterArr]);
    }

    setActiveBars([]);

    return { mergedArr: mergedArr, tempMasterArr: tempMasterArr };
  };

  const mergeSort = async (arr, lo, hi, tempMasterArr) => {
    if (lo === hi) {
      return { mergedArr: [arr[lo]], tempMasterArr: tempMasterArr };
    }

    let mid = Math.floor((lo + hi) / 2);

    let leftCall = await mergeSort(arr, lo, mid, tempMasterArr);
    let leftMergedArr = leftCall.mergedArr;
    let leftTempMasterArr = leftCall.tempMasterArr;

    let rightCall = await mergeSort(arr, mid + 1, hi, leftTempMasterArr);
    let rightMergedArr = rightCall.mergedArr;
    let rightTempMasterArr = rightCall.tempMasterArr;

    return await mergeTwoSortedLists(
      leftMergedArr,
      rightMergedArr,
      rightTempMasterArr
    );
  };

  return (
    <div className='container'>
      <Barchart
        arr={masterArr}
        activeBars={activeBars}
        pivotBar={[]}
        sortedBars={[]}
      />
    </div>
  );
}

export default MergeSort;
