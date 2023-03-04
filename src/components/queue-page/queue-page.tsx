import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './queue-page.module.css';

interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peak: () => T | null;
}

export class Queue<T> implements IQueue<T> {
  private container: (T | null)[] = [];
  private head = 0;
  private tail = 0;
  private readonly size: number = 0;
  private length: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size);
  }

  enqueue = (item: T) => {
    if (this.length >= this.size) {
      throw new Error("Maximum length exceeded");
    }
    this.container[this.tail % this.size] = item;
    this.tail++;
    this.length++;
  };

  dequeue = () => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    
    this.container[this.head%this.size] = null;
    this.head++;
    this.length--;
  };

  peak = (): T | null => {
    if (this.isEmpty()) {
      throw new Error("No elements in the queue");
    }
    return this.container[this.head];
  };

  clean = () => {
    this.container = [];
    this.tail = 0;
    this.head = 0;
    this.length = 0;
  }

  isEmpty = () => this.length === 0;

  getElements = () => this.container;

  getTail = () => this.tail > this.size ? this.tail % this.size : this.tail;

  getHead = () => this.head % this.size;

  getSize = () => this.size;
}

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

    actionIndex = action === 'add' ? tail : head ;
    const tailPending = isPending && action === 'add' ? tail-1 : tail; 

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
