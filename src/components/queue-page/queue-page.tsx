import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import Queue from "../../utils/queue";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './queue-page.module.css';

const queue = new Queue<string>(6);

export const QueuePage: React.FC = () => {

  const [isPending, setPending] = useState<boolean>(false);
  const [inputForm, setInputForm] = useState<string>('');
  const [action, setAction] = useState<string>('');

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setInputForm(event.currentTarget.value);
  }

  const handleAddElement = (event: SyntheticEvent) => {
    event.preventDefault();
    queue.enqueue(inputForm);
    setAction('add');
    setPending(true);
  }

  const handleRemoveElement = () => {
    queue.dequeue();
    setAction('remove');
    setPending(true);
  }

  const handleCleanStack = () => {
    queue.clean();
    setPending(true);
  }

  useEffect(() => {
    setTimeout(() => {
      if (isPending) {
        setAction('');
        setPending(false);
      }
    }, 500)
  }, [isPending])

  const renderQueue = () => {
    let components = [];
    const array = queue.getElements();
    const size = queue.getSize();
    const tail = queue.getTail() === 0 ? 0 : queue.getTail() - 1;
    const head = queue.getHead();
    let actionIndex = size + 1;

    actionIndex = action === 'add' ? tail : head;
    const tailPending = isPending && action === 'add' ? tail - 1 : tail;

    for (let index = 0; index < size; index++) {
      const element = array[index];
      components.push(
        <Circle
          key={index}
          head={index === head ? 'head' : ''}
          tail={index === tailPending ? 'tail' : ''}
          state={index === actionIndex && isPending ? ElementStates.Changing : ElementStates.Default}
          letter={index === actionIndex && isPending && action === 'add' ? '' : (element ? element : '')}
          index={index}
          extraClass={styles.Number}
        />
      )

    }

    return components;
  }

  const isValid = inputForm.length === 0;

  return (
    <SolutionLayout title="Очередь">
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
          disabled={isValid || queue.getSize() === queue.getTail()}
          isLoader={isPending}
          type='submit'
          text='Добавить'
          onClick={handleAddElement}
        />
        <Button
          extraClass={styles.RemoveButton}
          disabled={isValid || queue.getSize() === queue.getHead()}
          isLoader={isPending}
          type='button'
          text='Удалить'
          onClick={handleRemoveElement}
        />
        <Button
          isLoader={isPending}
          type='button'
          text='Очистить'
          onClick={handleCleanStack}
        />
      </form>
      <div className={styles.CharContainer}>
        {renderQueue()}
      </div>
    </SolutionLayout>
  );
};
