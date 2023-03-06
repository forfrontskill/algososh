import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './fibonacci-page.module.css';

type TFib = { index: number, num: number, arr: number[] };

export const FibonacciPage: React.FC = () => {

  const [isPending, setPending] = useState<boolean>(false);
  const [inputForm, setInputForm] = useState<string>('');
  const [numbers, setNumbers] = useState<TFib>({ index: 2, num: 0, arr: [] });

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setInputForm(event.currentTarget.value);
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setNumbers({ index: 2, num: Number(inputForm), arr: [] });
    setPending(state => !state);
  }

  useEffect(() => {

    setTimeout(() => {
      if (isPending) {
        setNumbers((nums) => {
          if (nums.index < nums.num + 1) {
            const arr = nums.arr.length === 0 ? [1, 1] : nums.arr;
            let index = nums.index;

            const next = arr[index - 2] + arr[index - 1];
            let nextIndex = index + 1;

            return { ...nums, index: nextIndex, arr: [...arr, next] }
          } else {
            setPending(false);
            return nums;
          }
        })
      }
    }, 1000);
  }, [numbers, isPending])


  const num = Number(inputForm);
  const isValid = num < 1 || num > 19;

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.Form}>
        <Input
          disabled={isPending}
          value={inputForm}
          maxLength={19}
          type='number'
          max={'19'}
          min={'1'}
          isLimitText={true}
          onChange={handleInputChange}
        />
        <Button
          extraClass={styles.Button}
          disabled={isValid}
          isLoader={isPending}
          type='submit'
          text='Развернуть'
          onClick={handleSubmit}
        />
      </form>
      <div className={styles.CharContainer}>
        {numbers.arr.map((num, index) => (
          <Circle
            key={index}
            letter={num.toString()}
            index={index}
            extraClass={styles.Number}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
