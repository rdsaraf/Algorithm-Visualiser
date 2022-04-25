import React, { useEffect, useState } from "react";
import Barchart from "./Barchart";
import "./style.css";

const SelectionSort = ({ arrayProp, doSort, setDoSort, timeout }) => {
  const [array, setArray] = useState([]);
  //Sets two comparing indices
  const [activeBars, setActiveBars] = useState([]);
  //sets already sorted indices
  const [sortedBars, setSortedBars] = useState([]);

  //loads array received from OptionBars
  useEffect(() => {
    setArray(arrayProp);
  }, [arrayProp]);

  useEffect(() => {
    async function sorting() {
      if (doSort) {
        let tempArr = [...array];
        await selectionSort(tempArr);
        setDoSort(false);
      }
    }
    sorting();
  }, [doSort]);

  //Selection sort logic
  const selectionSort = async (arr) => {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        await timeout();
        //i and j are comparing indices so store it in setActiveBars
        setActiveBars([arr[i], arr[j]]);

        if (arr[j].num < arr[i].num) {
          let temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
        }
      }

      await timeout();
      setSortedBars([...arr.slice(0, i + 1)]);
      setActiveBars([]);
      setArray([...arr]);
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
};

export default SelectionSort;
