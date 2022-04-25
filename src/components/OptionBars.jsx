import React, { useEffect, useState } from "react";
import Slider from "react-input-slider";
import SelectionSort from "./SelectionSort";
import "./OptionBars.css";
import BubbleSort from "./BubbleSort";
import MergeSort from "./MergeSort";
import QuickSort from "./QuickSort";
import InsertionSort from "./InsertionSort";

const OptionBars = () => {
  //Set Array
  const [array, setArray] = useState([]);
  //Set Array Size
  const [arrSize, setArrSize] = useState(100);
  //Decide sorting algorithm
  const [currSort, setCurrSort] = useState(0);
  //Boolean var decides whether we have to sort or not
  const [doSort, setDoSort] = useState(false);
  //Decides delay between animations
  const [delay, setDelay] = useState(5);

  //Generates random array
  const generateRandomArray = () => {
    const tempArr = [];
    for (let i = 0; i < arrSize; i++) {
      tempArr.push({
        num: Math.floor(Math.random() * 500),
        idx: i,
      });
    }
    setArray([...tempArr]);
  };

  //Change size of array using slider
  const handleSizeChange = (value) => {
    if (value > 200) {
      setArrSize(200);
    } else if (value < 0) {
      setArrSize(0);
    } else {
      setArrSize(value);
    }
  };

  //Change Delay of animation using slider
  const handleDelayChange = (value) => {
    if (value > 1000) {
      setDelay(1000);
    } else if (value < 0) {
      setDelay(0);
    } else {
      setDelay(value);
    }
  };

  //Generates random array before loading
  useEffect(() => {
    generateRandomArray();
    // eslint-disable-next-line
  }, []);

  //delay function
  function timeout() {
    return new Promise((resolve) => setTimeout(resolve, delay));
  }

  //Sorting algorithms list
  const sortOptions = [
    "Merge Sort",
    "Quick Sort",
    "Bubble Sort",
    "Selection Sort",
    "Insertion Sort",
  ];

  return (
    <div>
      <div id='nav-container'>
        <div id='sort-options'>
          {sortOptions.map((so, idx) => (
            <div
              key={idx}
              className='sort-option'
              onClick={() => {
                if (!doSort) setCurrSort(idx);
              }}
              style={{
                backgroundColor: idx === currSort ? "#e07c24" : "#242B2E",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {so}
            </div>
          ))}
        </div>

        <div id='chart-options'>
          <button
            onClick={() => {
              generateRandomArray();
            }}
            className='btn'
            id='random-btn'
            disabled={doSort}
          >
            Random
          </button>
          <div id='arrSize-container'>
            <Slider
              axis='x'
              x={arrSize}
              onChange={(e) => handleSizeChange(e.x)}
              className='slider'
              disabled={doSort}
              xmax={200}
              xmin={0}
              xstep={10}
              styles={{
                track: {
                  width: "10vw",
                },
                thumb: {
                  width: "15px",
                  height: "15px",
                },
              }}
            />
            <p style={{ paddingLeft: "1rem" }}>{arrSize}</p>
          </div>

          <div id='delay-container'>
            <Slider
              axis='x'
              x={delay}
              onChange={(e) => handleDelayChange(e.x)}
              className='slider'
              disabled={doSort}
              xmax={500}
              xmin={0}
              xstep={5}
              styles={{
                track: {
                  width: "10vw",
                },
                thumb: {
                  width: "15px",
                  height: "15px",
                },
              }}
            />
            <p style={{ paddingLeft: "1rem" }}>{delay} ms</p>
          </div>

          <button
            className='btn'
            id='sort-btn'
            disabled={doSort}
            onClick={() => setDoSort(true)}
          >
            Sort
          </button>
        </div>
      </div>
      <div id='visualizer'>
        {currSort === 0 ? (
          <MergeSort
            arrayProp={array}
            doSort={doSort}
            setDoSort={setDoSort}
            timeout={timeout}
          />
        ) : currSort === 1 ? (
          <QuickSort
            arrayProp={array}
            doSort={doSort}
            setDoSort={setDoSort}
            timeout={timeout}
          />
        ) : currSort === 2 ? (
          <BubbleSort
            arrayProp={array}
            doSort={doSort}
            setDoSort={setDoSort}
            timeout={timeout}
          />
        ) : currSort === 3 ? (
          <SelectionSort
            arrayProp={array}
            doSort={doSort}
            setDoSort={setDoSort}
            timeout={timeout}
          />
        ) : currSort === 4 ? (
          <InsertionSort
            arrayProp={array}
            doSort={doSort}
            setDoSort={setDoSort}
            timeout={timeout}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default OptionBars;
