import React, { FormEvent, useEffect, useState } from "react";
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

export const SortingPage: React.FC = () => {

  const [isPending, setPending] = useState<boolean>(false);
  const [sortType, setSortType] = useState<string>('choose');
  const [sortDiraction, setSortDiraction] = useState<Direction>(Direction.Ascending);
  const [data, setData] = useState<TSortState>({ curr: 0, next: 0, maxIndex: 0, elements: [] })

  const handleGenerateArray = () => {
    const newArr = randomArr(6, 6).map(item => ({ num: item, color: ElementStates.Default }));
    setData({ ...data, elements: newArr, curr:0, next:0, maxIndex:0 });
  }

  const handleSort = (type: Direction) => () => {
    setSortDiraction(type);
    setData({...data, curr:0, next:0, maxIndex:0});
    setPending(true);
  }

  const handleSortType = (e: FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSortType(value);
  }

  useEffect(() => {
    setTimeout(() => {
      if (isPending) {
        if (sortType === 'choose') {
          let arr = [...data.elements];
          const length = arr.length;
          let curr = data.curr;
          let next = data.next;
          let maxInd = data.maxIndex;
          arr[next].color = ElementStates.Default;
          if (curr === next) {
            arr[next].color = ElementStates.Modified;
          }
          if (curr < length - 1) {
            if (next < length) {
              const check = sortDiraction === Direction.Ascending ? arr[maxInd].num > arr[next].num : arr[maxInd].num < arr[next].num
              if (check) {
                maxInd = next;
              }
              next++;
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
        } else {

          let arr = [...data.elements];
          const length = arr.length;
          let curr = data.curr;
          let next = data.next;

          if (curr < length) {
            if (next < length - curr - 1) {

              if (next !== 0) {
                arr[next - 1].color = ElementStates.Default;
              }

              arr[next].color = ElementStates.Changing;
              arr[next + 1].color = ElementStates.Changing;

              const check = sortDiraction === Direction.Ascending ? arr[next].num > arr[next + 1].num : arr[next].num < arr[next + 1].num;

              if (check) {
                const temp = arr[next];
                arr[next] = arr[next + 1];
                arr[next + 1] = temp;
              }
              next++;
            } else {
              arr[length - curr - 1].color = ElementStates.Modified;
              if (next === 0) {
                arr[next].color = ElementStates.Modified;
              } else {
                arr[next - 1].color = ElementStates.Default;
              }
              next = 0;
              curr++;
            }

            setData({ curr, next, elements: arr, maxIndex: 0 })
          } else {
            setPending(false);
          }
        }
      }
    }, 500);

  }, [isPending, data, sortDiraction, sortType])

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
          isLoader={isPending}
          extraClass={styles.SortButtonAsc}
          text='По возрастанию'
          sorting={Direction.Ascending}
          onClick={handleSort(Direction.Ascending)}
        />
        <Button
          isLoader={isPending}
          extraClass={styles.SortButtonDesc}
          text='По убыванию'
          sorting={Direction.Descending}
          onClick={handleSort(Direction.Descending)}
        />
        <Button
          disabled={isPending}
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
