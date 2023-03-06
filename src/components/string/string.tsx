import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './string.module.css';

type TString = { char: string, color: ElementStates };
type TStringArray = { str: string, startIndex: number; endIndex: number; arr: ReadonlyArray<TString> };

export const StringComponent: React.FC = () => {
  const [isPending, setPending] = useState<boolean>(false);
  const [inputForm, setInputForm] = useState<string>('');
  const [form, setForm] = useState<TStringArray>({ str: '', startIndex: 0, endIndex: 0, arr: [] });

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setInputForm(event.currentTarget.value);
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const str: string = inputForm;
    const arr: ReadonlyArray<TString> = str.split('').map(item => ({ char: item, color: ElementStates.Default }));
    setForm({ str, startIndex: 0, endIndex: arr.length - 1, arr });
    setPending(state => !state);
  }

  useEffect(() => {
    setTimeout(() => {

      setForm((state) => {

        if (isPending) {

          let start = state.startIndex;
          let end = state.endIndex;
          const arrNew = [...state.arr];

          if (start <= end) {
            if (start > 0)
              arrNew[start - 1].color = ElementStates.Modified;
            if (end < arrNew.length - 1)
              arrNew[end + 1].color = ElementStates.Modified;

            arrNew[start].color = ElementStates.Changing;
            arrNew[end].color = ElementStates.Changing;

            const tempElement = arrNew[start];
            arrNew[start] = arrNew[end];
            arrNew[end] = tempElement;

            start++;
            end--;
            return { str: '', startIndex: start, endIndex: end, arr: arrNew };
          } else {
            setPending(false);
            return { ...state, arr: state.arr.map(item => ({ char: item.char, color: ElementStates.Modified })) };
          }
        } else {
          setPending(false);
          return state;
        }
      })

    }, 1000);
  }, [form, isPending])

  return (
    <SolutionLayout title="Строка">
      <form className={styles.Form}>
        <Input
          disabled={isPending}
          value={inputForm}
          maxLength={11}
          isLimitText={true}
          onChange={handleInputChange}
        />
        <Button
          extraClass={styles.Button}
          isLoader={isPending}
          disabled={!inputForm}
          type='submit'
          text='Развернуть'
          onClick={handleSubmit}
        />
      </form>
      <div className={styles.CharContainer}>
        {form?.arr.map((itemChar, index) => (
          <Circle
            key={index}
            letter={itemChar.char}
            state={itemChar.color}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
