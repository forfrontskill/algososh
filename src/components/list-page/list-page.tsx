import React, { FormEvent, useState } from "react";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "../../utils/linkedlist";
import { delay } from "../../utils/specdelay";
import { Button } from "../ui/button/button";
import CircleExtended from "../ui/circle-extended/circle-extended";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './list-page.module.css';

type TElement = { num: string, color: ElementStates }

type TElementExtended = { top?: TElement, main: TElement, bottom?: TElement }

type TButtonStatus = 'active' | 'disabled' | 'pending';

type TButtonsStatus = {
  inputValue: TButtonStatus,
  inputIndex: TButtonStatus,
  addHead: TButtonStatus,
  addTail: TButtonStatus,
  removeHead: TButtonStatus,
  removeTail: TButtonStatus,
  addByIndex: TButtonStatus,
  removeByIndex: TButtonStatus
}

const list = new LinkedList<string>('0');
list.append('34');
list.append('8');
list.append('1');

const DELEAY_TIME = 1000;

export const ListPage: React.FC = () => {

  const [isPending, setPending] = useState<TButtonsStatus>({
    inputValue: 'active',
    inputIndex: 'active',
    addHead: 'disabled',
    addTail: 'disabled',
    removeHead: 'active',
    removeTail: 'active',
    addByIndex: 'disabled',
    removeByIndex: 'disabled'
  });

  const [inputValueForm, setInputValueForm] = useState<string>('');
  const [inputIndexForm, setInputIndexForm] = useState<string>('');
  const [array, setArray] = useState<TElementExtended[]>(list.toArray().map(item => ({ main: { num: item, color: ElementStates.Default } })));

  const handleInputValueChange = (event: FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setInputValueForm(value);
    setPending({
      inputValue: 'active',
      inputIndex: 'active',
      addHead: value ? 'active' : 'disabled',
      addTail: value ? 'active' : 'disabled',
      removeHead: 'active',
      removeTail: 'active',
      addByIndex: value && inputIndexForm ? 'active' : 'disabled',
      removeByIndex: inputIndexForm ? 'active' : 'disabled',
    });
  }

  const handleInputIndexChange = (event: FormEvent<HTMLInputElement>) => {
    const index = event.currentTarget.value;
    setInputIndexForm(index);
    setPending({
      inputValue: 'active',
      inputIndex: 'active',
      addHead: inputValueForm ? 'active' : 'disabled',
      addTail: inputValueForm ? 'active' : 'disabled',
      removeHead: 'active',
      removeTail: 'active',
      addByIndex: inputValueForm && index ? 'active' : 'disabled',
      removeByIndex: index ? 'active' : 'disabled',
    });
  }

  const handleAddHead = async () => {
    setPending({
      inputValue: 'disabled',
      inputIndex: 'disabled',
      addHead: 'pending',
      addTail: 'disabled',
      removeHead: 'disabled',
      removeTail: 'disabled',
      addByIndex: 'disabled',
      removeByIndex: 'disabled'
    });

    const addTopArray = [...array];
    addTopArray[0].top = { num: inputValueForm, color: ElementStates.Changing }
    setArray(addTopArray);
    await delay(DELEAY_TIME);

    list.prepend(inputValueForm);

    const modyfiHead = list.toArray().map(item => ({ main: { num: item, color: ElementStates.Default } }));
    modyfiHead[0].main = { num: modyfiHead[0].main.num, color: ElementStates.Modified };
    setArray(modyfiHead);
    await delay(DELEAY_TIME);
    const finishArray = list.toArray().map(item => ({ main: { num: item, color: ElementStates.Default } }));
    setArray(finishArray);
    setInputValueForm('');
    setInputIndexForm('');
    setPending({
      inputValue: 'active',
      inputIndex: 'active',
      addHead: 'disabled',
      addTail: 'disabled',
      removeHead: 'active',
      removeTail: 'active',
      addByIndex: 'disabled',
      removeByIndex: 'disabled'
    });
  }

  const handleAddTail = async () => {
    setPending({
      inputValue: 'disabled',
      inputIndex: 'disabled',
      addHead: 'disabled',
      addTail: 'pending',
      removeHead: 'disabled',
      removeTail: 'disabled',
      addByIndex: 'disabled',
      removeByIndex: 'disabled'
    });
    const addTailArray = [...array];
    addTailArray[addTailArray.length - 1].top = { num: inputValueForm, color: ElementStates.Changing }
    setArray(addTailArray);
    await delay(DELEAY_TIME);

    list.append(inputValueForm);

    const modyfiTail = list.toArray().map(item => ({ main: { num: item, color: ElementStates.Default } }));
    modyfiTail[modyfiTail.length - 1].main = { num: modyfiTail[modyfiTail.length - 1].main.num, color: ElementStates.Modified };
    setArray(modyfiTail);
    await delay(DELEAY_TIME);
    const finishArray = list.toArray().map(item => ({ main: { num: item, color: ElementStates.Default } }));
    setArray(finishArray);
    setInputValueForm('');
    setInputIndexForm('');
    setPending({
      inputValue: 'active',
      inputIndex: 'active',
      addHead: 'disabled',
      addTail: 'disabled',
      removeHead: 'active',
      removeTail: 'active',
      addByIndex: 'disabled',
      removeByIndex: 'disabled'
    });
  }

  const handleRemoveHead = async () => {
    setPending({
      inputValue: 'disabled',
      inputIndex: 'disabled',
      addHead: 'disabled',
      addTail: 'disabled',
      removeHead: 'pending',
      removeTail: 'disabled',
      addByIndex: 'disabled',
      removeByIndex: 'disabled'
    });
    const removeHeadArray = [...array];
    removeHeadArray[0].bottom = { num: removeHeadArray[0].main.num, color: ElementStates.Changing };
    removeHeadArray[0].main = { num: '', color: ElementStates.Default };
    setArray(removeHeadArray);
    await delay(DELEAY_TIME);
    list.deleteHead();
    const finishArray = list.toArray().map(item => ({ main: { num: item, color: ElementStates.Default } }));
    setArray(finishArray);
    setInputValueForm('');
    setInputIndexForm('');
    setPending({
      inputValue: 'active',
      inputIndex: 'active',
      addHead: 'disabled',
      addTail: 'disabled',
      removeHead: 'active',
      removeTail: 'active',
      addByIndex: 'disabled',
      removeByIndex: 'disabled'
    });
  }

  const handleRemoveTail = async () => {
    setPending({
      inputValue: 'disabled',
      inputIndex: 'disabled',
      addHead: 'disabled',
      addTail: 'disabled',
      removeHead: 'disabled',
      removeTail: 'pending',
      addByIndex: 'disabled',
      removeByIndex: 'disabled'
    });
    const removeHeadArray = [...array];
    const tileIndex = removeHeadArray.length - 1;
    removeHeadArray[tileIndex].bottom = { num: removeHeadArray[tileIndex].main.num, color: ElementStates.Changing };
    removeHeadArray[tileIndex].main = { num: '', color: ElementStates.Default };
    setArray(removeHeadArray);
    await delay(DELEAY_TIME);
    list.deleteTail();
    const finishArray = list.toArray().map(item => ({ main: { num: item, color: ElementStates.Default } }));
    setArray(finishArray);
    setInputValueForm('');
    setInputIndexForm('');
    setPending({
      inputValue: 'active',
      inputIndex: 'active',
      addHead: 'disabled',
      addTail: 'disabled',
      removeHead: 'active',
      removeTail: 'active',
      addByIndex: 'disabled',
      removeByIndex: 'disabled'
    });
  }

  const handleAddByIndex = async () => {
    if (inputIndexForm) {
      setPending({
        inputValue: 'disabled',
        inputIndex: 'disabled',
        addHead: 'disabled',
        addTail: 'disabled',
        removeHead: 'disabled',
        removeTail: 'disabled',
        addByIndex: 'pending',
        removeByIndex: 'disabled'
      });
      let insertIndex: number = Number(inputIndexForm);
      let index: number = 0;

      while (index <= insertIndex) {
        await delay(DELEAY_TIME);
        let arr = [...array];
        arr[index].top = { num: inputValueForm, color: ElementStates.Changing }
        setArray(arr);
        await delay(DELEAY_TIME);
        arr = [...array];
        arr[index].top = undefined;
        if (index !== arr.length - 1) {
          arr[index + 1].top = { num: inputValueForm, color: ElementStates.Changing }
        }
        arr[index].main = { num: arr[index].main.num, color: ElementStates.Changing }
        setArray(arr);
        index++;
      }
      list.addByIndex(inputValueForm, Number(inputIndexForm));
      const modifArray = list.toArray().map(item => ({ main: { num: item, color: ElementStates.Default } }));
      modifArray[insertIndex].main = { num: modifArray[insertIndex].main.num, color: ElementStates.Modified };
      setArray(modifArray);
      await delay(DELEAY_TIME);
      const finishArray = list.toArray().map(item => ({ main: { num: item, color: ElementStates.Default } }));
      setArray(finishArray);
      setInputValueForm('');
      setInputIndexForm('');
      setPending({
        inputValue: 'active',
        inputIndex: 'active',
        addHead: 'disabled',
        addTail: 'disabled',
        removeHead: 'active',
        removeTail: 'active',
        addByIndex: 'disabled',
        removeByIndex: 'disabled'
      });
    }
  }

  const handleRemoveByIndex = async () => {

    if (inputIndexForm) {
      setPending({
        inputValue: 'disabled',
        inputIndex: 'disabled',
        addHead: 'disabled',
        addTail: 'disabled',
        removeHead: 'disabled',
        removeTail: 'disabled',
        addByIndex: 'disabled',
        removeByIndex: 'pending'
      });
      let insertIndex: number = Number(inputIndexForm);
      let index: number = 0;

      while (index <= insertIndex) {
        let arr = [...array];
        arr[index].main = { num: arr[index].main.num, color: ElementStates.Changing };
        setArray(arr);
        await delay(DELEAY_TIME);
        if (index === insertIndex) {
          arr = [...array];
          arr[index].bottom = { num: arr[index].main.num, color: ElementStates.Changing };
          arr[index].main = { num: '', color: ElementStates.Default };
          setArray(arr);
          await delay(DELEAY_TIME);
        }
        index++;
      }
      list.deleteByIndex(Number(inputIndexForm));
      const finishArray = list.toArray().map(item => ({ main: { num: item, color: ElementStates.Default } }));
      setArray(finishArray);
      setInputValueForm('');
      setInputIndexForm('');
      setPending({
        inputValue: 'active',
        inputIndex: 'active',
        addHead: 'disabled',
        addTail: 'disabled',
        removeHead: 'active',
        removeTail: 'active',
        addByIndex: 'disabled',
        removeByIndex: 'disabled'
      });
    }
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.Form}>
        <Input
          extraClass={styles.Input}
          disabled={isPending.inputValue === 'disabled'}
          value={inputValueForm}
          maxLength={4}
          isLimitText={true}
          placeholder='Введите значение'
          onChange={handleInputValueChange}
        />
        <Button
          extraClass={styles.SmallButton}
          disabled={isPending.addHead === 'disabled'}
          isLoader={isPending.addHead === 'pending'}
          type='button'
          text='Добавить в head'
          onClick={handleAddHead}
        />
        <Button
          extraClass={styles.SmallButton}
          disabled={isPending.addTail === 'disabled'}
          isLoader={isPending.addTail === 'pending'}
          type='button'
          text='Добавить в tail'
          onClick={handleAddTail}
        />
        <Button
          extraClass={styles.SmallButton}
          disabled={isPending.removeHead === 'disabled'}
          isLoader={isPending.removeHead === 'pending'}
          type='button'
          text='Удалить из head'
          onClick={handleRemoveHead}
        />
        <Button
          extraClass={styles.SmallButton}
          disabled={isPending.removeTail === 'disabled'}
          isLoader={isPending.removeTail === 'pending'}
          type='button'
          text='Удалить из tail'
          onClick={handleRemoveTail}
        />
      </div>
      <div className={styles.Form}>
        <Input
          type='number'
          disabled={isPending.inputIndex === 'disabled'}
          extraClass={styles.Input}
          value={inputIndexForm}
          placeholder='Введите индекс'
          onChange={handleInputIndexChange}
        />
        <Button
          extraClass={styles.LargeButton}
          disabled={isPending.addByIndex === 'disabled'}
          isLoader={isPending.addByIndex === 'pending'}
          type='button'
          text='Добавить по индексу'
          onClick={handleAddByIndex}
        />
        <Button
          extraClass={styles.LargeButton}
          disabled={isPending.removeByIndex === 'disabled'}
          isLoader={isPending.removeByIndex === 'pending'}
          type='button'
          text='Удалить по индексу'
          onClick={handleRemoveByIndex}
        />
      </div>
      <div className={styles.CharContainer}>
        {array.map((itemNode, index) => (
          <div key={index}>
            <CircleExtended
              top={itemNode.top ?
                {
                  letter: itemNode.top.num,
                  state: itemNode.top.color
                }
                : undefined}
              main={{
                letter: itemNode.main.num,
                state: itemNode.main.color,
                index,
                head: index === 0 ? 'head' : '',
                tail: index === list.getSize() - 1 ? 'tail' : ''
              }}
              bottom={itemNode.bottom ?
                {
                  letter: itemNode.bottom.num,
                  state: itemNode.bottom.color
                }
                : undefined}
              arrow={index === array.length - 1 ? undefined : itemNode.main.color}
            />
          </div>
        ))}
      </div>
    </SolutionLayout>
  );
};
