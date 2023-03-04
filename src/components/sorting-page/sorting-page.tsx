import { type } from "os";
import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './sorting-page.module.css';

type TSortElement = { num: number, color: ElementStates };
type TSortState = { curr: number, next: number, maxIndex: number, elements: ReadonlyArray<TSortElement> };

const randomArr = (min: number, max: number): number[] => {
  const count = Math.random() * (max - min) + min;
  return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
}


const swap = (arr: number[], firstIndex: number, secondIndex: number): void => {
  const temp = arr[firstIndex];
  arr[firstIndex] = arr[secondIndex];
  arr[secondIndex] = temp;
};

export const selectionSort = (arr: number[]) => {
  const { length } = arr;
  for (let i = 0; i < length - 1; i++) {
    let maxInd = i;
    for (let j = i + 1; j < length; j++) {
      if (arr[maxInd] < arr[j]) {
        maxInd = j;
      }
    }
    swap(arr, maxInd, i);
  }
  return arr;
};

export const SortingPage: React.FC = () => {


  const [isPending, setPending] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>('choose');
  const [sortDiraction, setSortDiraction] = useState<Direction>(Direction.Ascending);
  const [data, setData] = useState<TSortState>({ curr: 0, next: 0, maxIndex: 0, elements: [] })

  const handleGenerateArray = () => {
    console.log('Generate new array');
    const newArr = randomArr(5, 5).map(item => ({ num: item, color: ElementStates.Default }));
    setData({ ...data, elements: newArr });
  }

  const handleSort = (type: Direction) => () => {
    console.log(type);
    setSortDiraction(type);
    setPending(true);
  }

  const handleSortType = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSortType(value);
  }
  // console.log(`curr:${arr[curr].color} --- next:${arr[next].color} --- maxInd:${maxInd}`);
  // console.log(`curr:${curr} --- next:${next} --- maxInd:${maxInd}`);
  // console.log(`curr:${arr[curr].color} --- next:${arr[next].color} --- maxInd:${maxInd}`);

  useEffect(() => {
    console.log('start:', isPending);
    console.log(data);
    setTimeout(() => {
      if (isPending) {
        let arr = [...data.elements];
        const length = arr.length;
        let curr = data.curr;
        let next = data.next;
        let maxInd = data.maxIndex;
        arr[next].color = ElementStates.Default;
        if(curr === next){
          arr[next].color = ElementStates.Modified;
        }

        if (curr < length - 1) {
          if (next < length) {
            const check = sortDiraction === Direction.Ascending ? arr[maxInd].num > arr[next].num : arr[maxInd].num < arr[next].num
            if (check) {
              maxInd = next;
            }
            next++;
            // Перевод на следующий current
            if (next === length) {
              
              const temp = arr[maxInd];
              arr[maxInd] = arr[curr];
              arr[curr] = temp;
              arr[maxInd].color = ElementStates.Default;
              arr[curr].color = ElementStates.Modified;

              next = curr + 1;
              curr++;
              maxInd = curr;
            }
          }

          arr[curr].color = ElementStates.Changing;
          arr[next].color = ElementStates.Changing;

          setData({ curr, next, elements: arr, maxIndex: maxInd })
        } else {
          setPending(false);
        }

      }
    }, 1000);

  }, [isPending, data])

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.Contorls}>
        <div className={styles.RadioButtonContainer}>
          <RadioInput
            extraClass={styles.RadioButton}
            label='Выбор'
            name="sort-type"
            value='choose'
            onChange={handleSortType}
            checked={sortType === 'choose'}
          />
          <RadioInput
            extraClass={styles.RadioButton}
            label='Пузырёк' name="sort-type"
            value='bubble'
            onChange={handleSortType}
            checked={sortType === 'bubble'} />
        </div>

        <Button
          extraClass={styles.SortButtonAsc}
          text='По возрастанию'
          sorting={Direction.Ascending}
          onClick={handleSort(Direction.Ascending)}
        />
        <Button
          extraClass={styles.SortButtonDesc}
          text='По убыванию'
          sorting={Direction.Descending}
          onClick={handleSort(Direction.Descending)}
        />
        <Button
          text='Новый масив'
          onClick={handleGenerateArray}
        />
      </div>
      <div className={styles.ElementsContainer}>
        {data.elements.map((element, index) => (
          <Column
            key={index}
            index={element.num}
            state={element.color}
          />
        ))}
      </div>

    </SolutionLayout>
  );
};
