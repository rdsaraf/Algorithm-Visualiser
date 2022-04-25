import React, { useEffect, useState } from "react";
import Barchart from "./Barchart";
import "./style.css";

function QuickSort({ arrayProp, doSort, setDoSort, timeout }) {
  const [arr, setArr] = useState([]);
  const [activeBars, setActiveBars] = useState([]);
  const [pivotBar, setPivotBar] = useState({});

  useEffect(() => {
    setArr(arrayProp);
  }, [arrayProp]);

  useEffect(() => {
    async function sorting() {
      if (doSort) {
        let tempArr = [...arr];
        await quickSort(tempArr, 0, tempArr.length - 1);
        setDoSort(false);
      }
    }
    sorting();
  }, [doSort]);

  const partition = async (arr, pivot, lo, hi) => {
    setPivotBar(arr[hi]);

    let i = lo,
      j = lo;
    while (i <= hi) {
      await timeout();
      setActiveBars([arr[i], arr[j]]);

      if (arr[i].num > pivot) {
        i++;
      } else {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        i++;
        j++;
      }

      await timeout();
      setArr([...arr]);
    }

    setActiveBars([]);
    setPivotBar({});
    return j - 1;
  };

  const quickSort = async (arr, lo, hi) => {
    if (lo >= hi) {
      return;
    }

    let partitionIdx = await partition(arr, arr[hi].num, lo, hi);
    await quickSort(arr, lo, partitionIdx - 1);
    await quickSort(arr, partitionIdx + 1, hi);
  };

  return (
    <div className='container'>
      <Barchart
        arr={arr}
        activeBars={activeBars}
        pivotBar={pivotBar}
        sortedBars={[]}
      />
    </div>
  );
}

export default QuickSort;
