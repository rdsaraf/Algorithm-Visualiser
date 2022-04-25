import React, { useEffect, useState } from "react";
import Barchart from "./Barchart";
import "./style.css";

function BubbleSort({ arrayProp, doSort, setDoSort, timeout }) {
  const [array, setArraay] = useState([]);
  const [activeBars, setActiveBars] = useState([]);
  const [sortedBars, setSortedBars] = useState([]);

  useEffect(() => {
    setArraay(arrayProp);
  }, [arrayProp]);

  useEffect(() => {
    async function sorting() {
      if (doSort) {
        let tempArr = [...array];
        await bubbleSort(tempArr);
        setDoSort(false);
      }
    }
    sorting();
  }, [doSort]);

  const bubbleSort = async (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        await timeout();
        setActiveBars([arr[j], arr[j + 1]]);

        if (arr[j + 1].num < arr[j].num) {
          let temp = arr[j + 1];
          arr[j + 1] = arr[j];
          arr[j] = temp;
        }
      }
      await timeout();
      setSortedBars([...arr.slice(arr.length - i - 1)]);
      setActiveBars([]);
      setArraay([...arr]);
    }
    await timeout();
    setSortedBars([]);
  };

  return (
    <div className='container'>
      <Barchart
        arr={array}
        activeBars={activeBars}
        pivotBar={[]}
        sortedBars={sortedBars}
      />
    </div>
  );
}

export default BubbleSort;
