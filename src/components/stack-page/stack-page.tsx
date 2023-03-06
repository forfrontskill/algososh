import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import Stack from "../../utils/stack";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './stack-page.module.css';

const staticStack = new Stack<string>();

export const StackPage: React.FC = () => {

  const [isPending, setPending] = useState<boolean>(false);
  const [inputForm, setInputForm] = useState<string>('');

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setInputForm(event.currentTarget.value);
  }

  const handleAddElement = (event: SyntheticEvent) => {
    event.preventDefault();
    staticStack.push(inputForm);
    setPending(true);
  }

  const handleRemoveElement = () => {
    staticStack.pop();
    setPending(true);
  }

  const handleCleanStack = () => {
    staticStack.clear();
    setPending(true);
  }

  useEffect(() => {
    setTimeout(() => {
      if (isPending) {
        setPending(false);
      }
    }, 500)
  }, [isPending])

  const isValid = inputForm.length === 0;
  const stackSize = staticStack.getSize();

  return (
    <SolutionLayout title="Стек">
      <form className={styles.Form}>
        <Input
          disabled={isPending}
          extraClass={styles.Input}
          value={inputForm}
          maxLength={4}
          isLimitText={true}
          onChange={handleInputChange}
        />
        <Button
          extraClass={styles.AddButton}
          disabled={isValid}
          isLoader={isPending}
          type='submit'
          text='Добавить'
          onClick={handleAddElement}
        />
        <Button
          extraClass={styles.RemoveButton}
          disabled={isValid}
          isLoader={isPending}
          type='button'
          text='Удалить'
          onClick={handleRemoveElement}
        />
        <Button
          disabled={isValid}
          isLoader={isPending}
          type='button'
          text='Очистить'
          onClick={handleCleanStack}
        />
      </form>
      <div className={styles.CharContainer}>
        {staticStack.getElements().map((num, index) => (
          <Circle
            key={index}
            head={index === stackSize - 1 ? 'top' : ''}
            state={index === stackSize - 1 && isPending ? ElementStates.Changing : ElementStates.Default}
            letter={num.toString()}
            index={index}
            extraClass={styles.Number}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
